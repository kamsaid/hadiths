/**
 * API route for handling chat requests to the Yaseen backend
 * Proxies requests to the backend API and returns the response
 */

export async function POST(request) {
  try {
    // Get the request body (user's message)
    const body = await request.json();
    
    // ------------------------------------------------------------------
    // Resolve backend API URL
    // ------------------------------------------------------------------
    // 1. Allow the user to provide a custom URL via NEXT_PUBLIC_BACKEND_URL or
    //    BACKEND_URL so that the same value can be used on both the server
    //    and client side when needed.
    // 2. Fall-back sensibly to FastAPI's default development port (8000).
    //    The previous hard-coded value of 3003 caused connection errors when
    //    the developer launched the backend with the common command
    //    `uvicorn backend.main:app --reload` – `uvicorn` defaults to port
    //    **8000**, not 3003.  Using 8000 therefore works out-of-the-box for
    //    new contributors.
    // 3. Finally, if no backend is available we keep `backendUrl` undefined –
    //    the subsequent fetch will throw and we return a clear JSON error so
    //    the front-end can display a helpful message instead of a generic 500.
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      process.env.BACKEND_URL ||
      'http://localhost:8000';
    
    // Forward the request to the backend
    const response = await fetch(`${backendUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    // If the backend returns an error, try to extract a helpful message
    // rather than throwing due to a non-JSON error payload
    if (!response.ok) {
      let errorMessage = 'An error occurred while processing your request';
      const contentType = response.headers.get('content-type') || '';

      try {
        // Prefer JSON error bodies when available
        if (contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData?.detail || errorData?.error || errorMessage;
        } else {
          // Fallback to plain text responses from the backend/web server
          const errorText = await response.text();
          if (errorText && errorText.trim().length > 0) {
            errorMessage = errorText.trim();
          }
        }
      } catch (_) {
        // Silently ignore parsing errors and keep the default message
      }

      return Response.json({ error: errorMessage }, { status: response.status });
    }
    
    // Return the backend response
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error in chat API route:', error);

    // Provide a clearer error to the client – most of the time the failure is
    // simply that the FastAPI backend is **not running**.  Detect this based on
    // error message patterns thrown by `fetch` and adjust the output so the UI
    // can show a helpful hint instead of a generic "unexpected error" string.
    const message = typeof error?.message === 'string' ? error.message : '';
    const isConnRefused =
      message.includes('ECONNREFUSED') ||
      message.includes('ENOTFOUND') ||
      message.includes('fetch failed') ||
      message.includes('Failed to fetch');

    const friendlyMessage = isConnRefused
      ? 'Unable to reach the backend service. Is the FastAPI server running?'
      : 'An unexpected error occurred';

    return Response.json(
      { error: friendlyMessage },
      { status: 500 }
    );
  }
} 