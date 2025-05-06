// API endpoint for retrieving hadith data from ahadith.json
import fs from 'fs';
import path from 'path';

/**
 * GET handler for the /api/hadith endpoint
 * Returns the hadith collection from ahadith.json
 */
export async function GET(request) {
  try {
    // Path to the ahadith.json file
    const filePath = path.join(process.cwd(), 'content', 'ahadith.json');
    
    // Read the file synchronously
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse the JSON
    const hadithData = JSON.parse(fileContents);
    
    // Return the entire hadith collection as JSON
    return new Response(JSON.stringify(hadithData), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error loading hadith data:', error);
    
    // Return error response
    return new Response(
      JSON.stringify({ error: 'Failed to load hadith data' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 