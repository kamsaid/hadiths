import fs from 'fs';
import path from 'path';
import { DOMParser } from 'xmldom';

// Cache for storing parsed surahs to avoid re-parsing the entire file
let surahCache = {};

/**
 * Parse the Quran XML file and extract a specific surah
 * @param {number} surahNumber - The surah number (1-114)
 * @returns {Object} The surah data with verses and translations
 */
export function getSurah(surahNumber) {
  // Return from cache if available
  if (surahCache[surahNumber]) {
    return surahCache[surahNumber];
  }

  try {
    // Path to the Quran XML file
    const xmlFilePath = path.join(process.cwd(), 'content/quran.xml');
    
    // Read the XML file
    const xmlData = fs.readFileSync(xmlFilePath, 'utf8');
    
    // Parse the XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    
    // Find the surah by number
    const surahs = xmlDoc.getElementsByTagName('surah');
    let targetSurah = null;
    
    for (let i = 0; i < surahs.length; i++) {
      const surah = surahs[i];
      const index = parseInt(surah.getAttribute('index'), 10);
      
      if (index === surahNumber) {
        targetSurah = surah;
        break;
      }
    }
    
    if (!targetSurah) {
      throw new Error(`Surah ${surahNumber} not found`);
    }
    
    // Extract surah details
    const surahName = targetSurah.getAttribute('name');
    const englishName = targetSurah.getAttribute('englishName') || surahName;
    const englishNameTranslation = targetSurah.getAttribute('englishNameTranslation') || '';
    const revelationType = targetSurah.getAttribute('revelationType') || '';
    
    // Extract ayahs (verses)
    const ayahNodes = targetSurah.getElementsByTagName('ayah');
    const ayahs = [];
    
    for (let i = 0; i < ayahNodes.length; i++) {
      const ayah = ayahNodes[i];
      const ayahNumber = parseInt(ayah.getAttribute('number'), 10);
      const text = ayah.textContent;
      
      // Get translation if available
      const translation = ayah.getAttribute('translation') || '';
      
      ayahs.push({
        number: ayahNumber,
        text,
        translation
      });
    }
    
    // Create the surah object
    const surahData = {
      number: surahNumber,
      name: surahName,
      englishName,
      englishNameTranslation,
      revelationType,
      ayahs
    };
    
    // Cache the result
    surahCache[surahNumber] = surahData;
    
    return surahData;
  } catch (error) {
    console.error(`Error parsing Surah ${surahNumber}:`, error);
    return null;
  }
}

/**
 * Get a list of all surahs with basic information
 * @returns {Array} Array of surah metadata
 */
export function getAllSurahs() {
  try {
    // Path to the Quran XML file
    const xmlFilePath = path.join(process.cwd(), 'content/quran.xml');
    
    // Read the XML file
    const xmlData = fs.readFileSync(xmlFilePath, 'utf8');
    
    // Parse the XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    
    // Find all surahs
    const surahs = xmlDoc.getElementsByTagName('surah');
    const surahList = [];
    
    for (let i = 0; i < surahs.length; i++) {
      const surah = surahs[i];
      const index = parseInt(surah.getAttribute('index'), 10);
      const name = surah.getAttribute('name');
      const englishName = surah.getAttribute('englishName') || name;
      const englishNameTranslation = surah.getAttribute('englishNameTranslation') || '';
      const revelationType = surah.getAttribute('revelationType') || '';
      const ayahCount = surah.getElementsByTagName('ayah').length;
      
      surahList.push({
        number: index,
        name,
        englishName,
        englishNameTranslation,
        revelationType,
        ayahCount
      });
    }
    
    return surahList;
  } catch (error) {
    console.error('Error getting all surahs:', error);
    return [];
  }
} 