/**
 * API route for fetching random content directly from Pinecone
 * Returns one random entry at a time from the knowledge base
 */

import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAI } from 'openai';

// Initialize Pinecone client
let pinecone = null;
let openai = null;

/**
 * Initialize connections to Pinecone and OpenAI
 */
async function initializeClients() {
  if (!pinecone) {
    // Initialize Pinecone with credentials from environment
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || '',
    });
  }
  
  if (!openai) {
    // Initialize OpenAI for generating embeddings
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
  }
  
  return { pinecone, openai };
}

/**
 * Generate embedding for a text query using OpenAI
 */
async function generateEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
    });
    
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    return null;
  }
}

export async function GET(request) {
  try {
    // Get parameters from query string
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get('topic') || null;
    
    // Check if we have the required environment variables
    if (!process.env.PINECONE_API_KEY || !process.env.OPENAI_API_KEY || !process.env.PINECONE_INDEX_NAME) {
      console.log('Missing environment variables, using mock data');
      return NextResponse.json({
        entry: generateSingleMockEntry(),
        isMock: true,
        message: 'Pinecone credentials not configured'
      });
    }
    
    // Initialize clients
    await initializeClients();
    
    // Get the Pinecone index
    const indexName = process.env.PINECONE_INDEX_NAME;
    const index = pinecone.index(indexName);
    
    // Generate a random query for variety
    const randomTopics = [
      'wisdom and patience in Islam',
      'stories of the prophets',
      'importance of prayer and worship',
      'kindness and mercy in Islam',
      'gratitude and thankfulness to Allah',
      'forgiveness and repentance',
      'charity and helping others',
      'knowledge and learning in Islam',
      'faith and trust in Allah',
      'Islamic ethics and morality',
      'miracles in the Quran',
      'lessons from Islamic history',
      'patience during hardship',
      'righteousness and good deeds',
      'remembrance of Allah'
    ];
    
    // Use provided topic or select random one
    const queryTopic = topic || randomTopics[Math.floor(Math.random() * randomTopics.length)];
    
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(queryTopic);
    
    if (!queryEmbedding) {
      throw new Error('Failed to generate embedding');
    }
    
    // Query Pinecone for similar vectors
    // We'll query for more results and then pick one randomly for better variety
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: 20, // Get top 20 results
      includeMetadata: true,
    });
    
    if (!queryResponse.matches || queryResponse.matches.length === 0) {
      console.log('No results from Pinecone, using mock data');
      return NextResponse.json({
        entry: generateSingleMockEntry(),
        isMock: true,
        topic: queryTopic
      });
    }
    
    // Randomly select one entry from the results for variety
    const randomIndex = Math.floor(Math.random() * Math.min(queryResponse.matches.length, 10));
    const selectedMatch = queryResponse.matches[randomIndex];
    
    // Extract and format the entry data
    const entry = {
      id: selectedMatch.id,
      title: extractTitle(selectedMatch.metadata),
      description: extractDescription(selectedMatch.metadata),
      source: selectedMatch.metadata?.source || 'Islamic Knowledge Base',
      category: categorizeContent(selectedMatch.metadata),
      metadata: {
        score: selectedMatch.score,
        ...selectedMatch.metadata
      }
    };
    
    return NextResponse.json({
      entry,
      topic: queryTopic,
      totalMatches: queryResponse.matches.length
    });
    
  } catch (error) {
    console.error('Error fetching from Pinecone:', error);
    
    // Return mock data as fallback
    return NextResponse.json({
      entry: generateSingleMockEntry(),
      isMock: true,
      error: error.message
    });
  }
}

/**
 * Extract a title from metadata
 */
function extractTitle(metadata) {
  // Try different possible title fields
  if (metadata?.title) return metadata.title;
  if (metadata?.name) return metadata.name;
  if (metadata?.heading) return metadata.heading;
  
  // Try to extract from content
  if (metadata?.text || metadata?.content) {
    const content = metadata.text || metadata.content;
    const firstLine = content.split(/[\n.!?]/)[0].trim();
    if (firstLine.length < 100) {
      return firstLine;
    }
    return firstLine.substring(0, 60) + '...';
  }
  
  return 'Islamic Wisdom';
}

/**
 * Extract description from metadata
 */
function extractDescription(metadata) {
  // Try different possible content fields
  const content = metadata?.text || metadata?.content || metadata?.description || '';
  
  // Clean the content
  const cleanContent = content
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Store the full content in metadata for expansion
  if (!metadata.full_text && cleanContent.length > 300) {
    metadata.full_text = cleanContent;
  }
  
  // Return appropriate length for card display
  if (cleanContent.length <= 300) {
    return cleanContent;
  }
  
  // Find a good break point for truncation
  const truncated = cleanContent.substring(0, 300);
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.substring(0, lastSpace) + '...';
}

/**
 * Categorize content based on metadata
 */
function categorizeContent(metadata) {
  const text = (metadata?.text || metadata?.content || '').toLowerCase();
  const source = (metadata?.source || '').toLowerCase();
  
  // Check for category patterns
  if (text.includes('prophet') || text.includes('story') || text.includes('ibrahim') || text.includes('musa')) {
    return 'Stories';
  }
  if (text.includes('prayer') || text.includes('salah') || text.includes('worship') || text.includes('ramadan')) {
    return 'Worship';
  }
  if (text.includes('patience') || text.includes('kindness') || text.includes('mercy') || text.includes('forgiveness')) {
    return 'Character';
  }
  if (source.includes('quran') || text.includes('ayah') || text.includes('surah')) {
    return 'Quran';
  }
  if (source.includes('hadith') || text.includes('hadith') || text.includes('prophet said')) {
    return 'Hadith';
  }
  
  return 'General';
}

/**
 * Generate a single mock entry for fallback
 */
function generateSingleMockEntry() {
  const mockEntries = [
    {
      id: '1',
      title: 'The Beauty of Patience',
      description: 'Learn about the virtue of patience (Sabr) in Islam and how it helps us navigate life\'s challenges with grace and faith. Patience is not just waiting, but maintaining good character while waiting.',
      source: 'Hadith Collection',
      category: 'Character'
    },
    {
      id: '2',
      title: 'Prophet Ibrahim\'s Sacrifice',
      description: 'The inspiring story of Prophet Ibrahim\'s unwavering faith and his willingness to sacrifice for Allah\'s command. This story teaches us about complete submission to Allah\'s will.',
      source: 'Prophet Stories',
      category: 'Stories'
    },
    {
      id: '3',
      title: 'The Night of Power',
      description: 'Understanding Laylat al-Qadr, the most blessed night of the year, and its significance in the holy month of Ramadan. A night better than a thousand months.',
      source: 'Quran Commentary',
      category: 'Worship'
    }
  ];
  
  return mockEntries[Math.floor(Math.random() * mockEntries.length)];
} 