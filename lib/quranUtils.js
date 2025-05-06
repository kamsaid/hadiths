// Client-side utils for accessing Quran data
// These functions fetch from the API endpoints instead of directly accessing files

/**
 * Get a list of all surahs with basic information
 * @returns {Promise<Array>} Promise resolving to array of surah metadata
 */
export async function getAllSurahs() {
  try {
    const response = await fetch('/api/quran');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch surahs: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching all surahs:', error);
    return [];
  }
}

/**
 * Get a specific surah with all its verses and translations
 * @param {number} surahNumber - The surah number (1-114)
 * @returns {Promise<Object>} Promise resolving to the surah data with verses and translations
 */
export async function getSurah(surahNumber) {
  try {
    const response = await fetch(`/api/quran?surah=${surahNumber}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch surah ${surahNumber}: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching surah ${surahNumber}:`, error);
    return null;
  }
} 