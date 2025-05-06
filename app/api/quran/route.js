import fs from 'fs';
import path from 'path';
import { DOMParser } from 'xmldom';
import { NextResponse } from 'next/server';

// Cache for storing parsed surahs to avoid re-parsing the entire file
let surahCache = {};
let allSurahsCache = null;

/**
 * Get a list of all surahs with basic information
 * @returns {Array} Array of surah metadata
 */
function getAllSurahs() {
  // Return from cache if available
  if (allSurahsCache) {
    return allSurahsCache;
  }

  try {
    // Path to the Quran XML file
    const xmlFilePath = path.join(process.cwd(), 'content/quran.xml');
    
    // Read the XML file
    const xmlData = fs.readFileSync(xmlFilePath, 'utf8');
    
    // Parse the XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    
    // Find all surahs - using 'sura' instead of 'surah'
    const surahs = xmlDoc.getElementsByTagName('sura');
    const surahList = [];
    
    for (let i = 0; i < surahs.length; i++) {
      const surah = surahs[i];
      const index = parseInt(surah.getAttribute('index'), 10);
      const name = surah.getAttribute('name');
      // Use preset English names
      const englishNames = [
        "Al-Fatihah", "Al-Baqarah", "Aali Imran", "An-Nisa", "Al-Ma'idah", "Al-An'am", 
        "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus", "Hud", "Yusuf", "Ar-Ra'd", 
        "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha", 
        "Al-Anbiya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", "Ash-Shu'ara", 
        "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajdah", 
        "Al-Ahzab", "Saba", "Fatir", "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar", 
        "Ghafir", "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah", 
        "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", "Adh-Dhariyat", 
        "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqi'ah", "Al-Hadid", 
        "Al-Mujadila", "Al-Hashr", "Al-Mumtahanah", "As-Saff", "Al-Jumu'ah", 
        "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", 
        "Al-Haqqah", "Al-Ma'arij", "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddathir", 
        "Al-Qiyamah", "Al-Insan", "Al-Mursalat", "An-Naba", "An-Nazi'at", "Abasa", 
        "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", 
        "At-Tariq", "Al-A'la", "Al-Ghashiyah", "Al-Fajr", "Al-Balad", "Ash-Shams", 
        "Al-Layl", "Ad-Duha", "Ash-Sharh", "At-Tin", "Al-Alaq", "Al-Qadr", "Al-Bayyinah", 
        "Az-Zalzalah", "Al-Adiyat", "Al-Qari'ah", "At-Takathur", "Al-Asr", "Al-Humazah", 
        "Al-Fil", "Quraysh", "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr", 
        "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
      ];
      
      // English name from the array or use the Arabic name as fallback
      const englishName = surah.getAttribute('englishName') || (index <= englishNames.length ? englishNames[index-1] : `Surah ${index}`);
      
      // Define common English translations for Surah names
      const englishTranslations = {
        "Al-Fatihah": "The Opening",
        "Al-Baqarah": "The Cow",
        "An-Nisa": "The Women",
        "Al-Ma'idah": "The Table Spread",
        // Add more as needed
      };
      
      const englishNameTranslation = surah.getAttribute('englishNameTranslation') || 
                                      englishTranslations[englishName] || '';
      
      // Determine revelation type (Meccan or Medinan)
      const revelationType = surah.getAttribute('revelationType') || 'Meccan';
      
      // Count ayahs (ayas)
      const ayahCount = surah.getElementsByTagName('aya').length;
      
      surahList.push({
        number: index,
        name,
        englishName,
        englishNameTranslation,
        revelationType,
        ayahCount
      });
    }
    
    // Store in cache
    allSurahsCache = surahList;
    
    return surahList;
  } catch (error) {
    console.error('Error getting all surahs:', error);
    return [];
  }
}

/**
 * Parse the Quran XML file and extract a specific surah
 * @param {number} surahNumber - The surah number (1-114)
 * @returns {Object} The surah data with verses and translations
 */
function getSurah(surahNumber) {
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
    
    // Find the surah by number - using 'sura' instead of 'surah'
    const surahs = xmlDoc.getElementsByTagName('sura');
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
    // Use name as englishName if not available
    const englishName = targetSurah.getAttribute('englishName') || surahName;
    const englishNameTranslation = targetSurah.getAttribute('englishNameTranslation') || '';
    const revelationType = targetSurah.getAttribute('revelationType') || 'Meccan'; // Default to Meccan if not specified
    
    // Extract ayahs (verses) - using 'aya' instead of 'ayah'
    const ayahNodes = targetSurah.getElementsByTagName('aya');
    const ayahs = [];
    
    for (let i = 0; i < ayahNodes.length; i++) {
      const ayah = ayahNodes[i];
      const ayahNumber = parseInt(ayah.getAttribute('index'), 10); // Use 'index' instead of 'number'
      const text = ayah.getAttribute('text') || ayah.textContent.trim().split('\n')[0]; // Try text attribute first, then fallback to the text content
      
      // Get translation from the nested translation element
      let translation = '';
      const translationElements = ayah.getElementsByTagName('translation');
      if (translationElements.length > 0) {
        translation = translationElements[0].textContent.trim();
      }
      
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
      englishName: englishName || `Surah ${surahNumber}`, // Fallback if englishName is not available
      englishNameTranslation: englishNameTranslation || '',
      revelationType: revelationType,
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

// GET handler for all surahs
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const surahNumber = searchParams.get('surah');
  
  if (surahNumber) {
    // Get specific surah if number is provided
    const data = getSurah(parseInt(surahNumber, 10));
    if (!data) {
      return NextResponse.json({ error: `Surah ${surahNumber} not found` }, { status: 404 });
    }
    return NextResponse.json(data);
  } else {
    // Get all surahs
    const surahs = getAllSurahs();
    return NextResponse.json(surahs);
  }
} 