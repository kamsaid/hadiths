/**
 * API route for handling chat requests to the Yaseen backend
 * Proxies requests to the backend API and returns the response
 */

export async function POST(request) {
  try {
    // Get the request body (user's message)
    const body = await request.json();
    
    // Configure the backend API URL (you might want to move this to an environment variable)
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    
    // Forward the request to the backend
    const response = await fetch(`${backendUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    // If the backend returns an error, throw it
    if (!response.ok) {
      const errorData = await response.json();
      return Response.json(
        { error: errorData.detail || 'An error occurred while processing your request' },
        { status: response.status }
      );
    }
    
    // Return the backend response
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error in chat API route:', error);
    return Response.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 