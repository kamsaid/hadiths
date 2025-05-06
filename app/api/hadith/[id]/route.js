// API endpoint for retrieving a specific hadith by ID
import fs from 'fs';
import path from 'path';

/**
 * GET handler for the /api/hadith/[id] endpoint
 * Returns a specific hadith by ID from ahadith.json
 */
export async function GET(request, { params }) {
  try {
    // Get the ID from the params
    const { id } = params;
    
    // Path to the ahadith.json file
    const filePath = path.join(process.cwd(), 'content', 'ahadith.json');
    
    // Read the file synchronously
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse the JSON
    const hadithData = JSON.parse(fileContents);
    
    // Find the hadith with the matching ID
    // Note: ID in param comes as string, but might be number in the data
    const hadith = hadithData.hadiths.find(h => h.idInBook.toString() === id.toString());
    
    if (!hadith) {
      return new Response(
        JSON.stringify({ error: 'Hadith not found' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Return the hadith as JSON
    return new Response(JSON.stringify(hadith), {
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