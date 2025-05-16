import fs from 'fs';
import path from 'path';
import { DOMParser } from 'xmldom';
import { NextResponse } from 'next/server';

// Cache for storing parsed surahs to avoid re-parsing the entire file
let surahCache = {};
let allSurahsCache = null;

// Add English translations for common surahs
const translationCache = {
  "1": { // Al-Fatihah
    1: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    2: "All praise is due to Allah, Lord of the worlds -",
    3: "The Entirely Merciful, the Especially Merciful,",
    4: "Sovereign of the Day of Recompense.",
    5: "It is You we worship and You we ask for help.",
    6: "Guide us to the straight path -",
    7: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray."
  },
  "2": { // Al-Baqarah (first few verses)
    1: "Alif, Lam, Meem.",
    2: "This is the Book about which there is no doubt, a guidance for those conscious of Allah -",
    3: "Who believe in the unseen, establish prayer, and spend out of what We have provided for them,",
    4: "And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain [in faith].",
    5: "Those are upon [right] guidance from their Lord, and it is those who are the successful."
  },
  "28": { // Al-Qasas
    1: "Ta, Seen, Meem.",
    2: "These are verses of the clear Book.",
    3: "We recite to you from the news of Moses and Pharaoh in truth for a people who believe.",
    4: "Indeed, Pharaoh exalted himself in the land and made its people into factions, oppressing a sector among them, slaughtering their sons and keeping their females alive. Indeed, he was of the corrupters.",
    5: "And We wanted to confer favor upon those who were oppressed in the land and make them leaders and make them inheritors.",
    6: "And establish them in the land and show Pharaoh and Haman and their soldiers through them that which they had feared.",
    7: "And We inspired to the mother of Moses, 'Suckle him; but when you fear for him, cast him into the river and do not fear and do not grieve. Indeed, We will return him to you and will make him [one] of the messengers.'",
    8: "And the family of Pharaoh picked him up so that he would become to them an enemy and a [cause of] grief. Indeed, Pharaoh and Haman and their soldiers were deliberate sinners.",
    9: "And the wife of Pharaoh said, '[He will be] a comfort of the eye for me and for you. Do not kill him; perhaps he may benefit us, or we may adopt him as a son.' And they perceived not.",
    10: "And the heart of Moses' mother became empty [of all else]. She was about to disclose [the matter concerning] him had We not bound fast her heart that she would be of the believers."
  }
};

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
    
    // Check if file exists
    if (!fs.existsSync(xmlFilePath)) {
      console.error(`Quran XML file not found at: ${xmlFilePath}`);
      return [];
    }
    
    // Read the XML file
    const xmlData = fs.readFileSync(xmlFilePath, 'utf8');
    
    // Parse the XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    
    // Check possible tag variations (sura, surah)
    let surahs = xmlDoc.getElementsByTagName('sura');
    if (surahs.length === 0) {
      surahs = xmlDoc.getElementsByTagName('surah');
    }
    
    // Check if any surahs were found
    if (surahs.length === 0) {
      console.error('No surahs found in the XML file. Check the XML structure.');
      // Log the first 500 characters of the XML for debugging
      console.log('XML preview:', xmlData.substring(0, 500) + '...');
      return [];
    }
    
    console.log(`Found ${surahs.length} surahs in the XML file`);
    const surahList = [];
    
    for (let i = 0; i < surahs.length; i++) {
      const surah = surahs[i];
      
      // Check for different attribute names (index/number)
      let index = parseInt(surah.getAttribute('index'), 10);
      if (isNaN(index)) {
        index = parseInt(surah.getAttribute('number'), 10);
      }
      if (isNaN(index)) {
        index = i + 1; // Fallback to position
      }
      
      // Get attributes with fallbacks
      const name = surah.getAttribute('name') || `سورة ${index}`;
      
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
      const englishName = surah.getAttribute('englishName') || 
                          (index <= englishNames.length ? englishNames[index-1] : `Surah ${index}`);
      
      // Define common English translations for Surah names
      const englishTranslations = {
        "Al-Fatihah": "The Opening",
        "Al-Baqarah": "The Cow",
        "Aali Imran": "Family of Imran",
        "An-Nisa": "The Women",
        "Al-Ma'idah": "The Table Spread",
        "Al-An'am": "The Cattle",
        "Al-A'raf": "The Heights",
        "Al-Anfal": "The Spoils of War",
        "At-Tawbah": "The Repentance",
        "Yunus": "Jonah",
        "Hud": "Hud",
        "Yusuf": "Joseph",
        "Ar-Ra'd": "The Thunder",
        "Ibrahim": "Abraham",
        "Al-Hijr": "The Rocky Tract",
        "An-Nahl": "The Bee",
        "Al-Isra": "The Night Journey",
        "Al-Kahf": "The Cave",
        "Maryam": "Mary",
        "Ta-Ha": "Ta-Ha",
        "Al-Anbiya": "The Prophets",
        "Al-Hajj": "The Pilgrimage"
        // More could be added as needed
      };
      
      const englishNameTranslation = surah.getAttribute('englishNameTranslation') || 
                                      englishTranslations[englishName] || '';
      
      // Determine revelation type (Meccan or Medinan)
      const revelationType = surah.getAttribute('revelationType') || 
                             surah.getAttribute('type') || 'Meccan';
      
      // Check possible ayah tag variations (aya, ayah)
      let ayahElements = surah.getElementsByTagName('aya');
      if (ayahElements.length === 0) {
        ayahElements = surah.getElementsByTagName('ayah');
      }
      
      const ayahCount = ayahElements.length;
      
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
 * Get English translation for a verse
 * @param {number} surahNumber - The surah number (1-114)
 * @param {number} ayahNumber - The ayah number 
 * @returns {string} The English translation or a fallback translation
 */
function getTranslation(surahNumber, ayahNumber) {
  // Convert parameters to integers to ensure proper comparison
  surahNumber = parseInt(surahNumber, 10);
  ayahNumber = parseInt(ayahNumber, 10);
  
  // Check if translation exists in cache
  if (translationCache[surahNumber] && translationCache[surahNumber][ayahNumber]) {
    return translationCache[surahNumber][ayahNumber];
  }
  
  // Extend translation cache for Surah Al-Baqarah with more verses
  if (surahNumber === 2 && !translationCache[2][ayahNumber] && ayahNumber <= 10) {
    // Add more translations for Surah Al-Baqarah
    const additionalTranslations = {
      6: "Those who disbelieve - it is all the same for them whether you warn them or do not warn them - they will not believe.",
      7: "Allah has set a seal upon their hearts and upon their hearing, and over their vision is a veil. And for them is a great punishment.",
      8: "And of the people are some who say, \"We believe in Allah and the Last Day,\" but they are not believers.",
      9: "They [think to] deceive Allah and those who believe, but they deceive not except themselves and perceive [it] not.",
      10: "In their hearts is disease, so Allah has increased their disease; and for them is a painful punishment because they [habitually] used to lie."
    };
    
    if (additionalTranslations[ayahNumber]) {
      return additionalTranslations[ayahNumber];
    }
  }
  
  // Common fallbacks for various surahs when exact translations aren't available
  const commonVerses = {
    // First verse fallbacks
    "bismillah": "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    "alif_lam_meem": "Alif, Lam, Meem. These are verses of the clear Book.",
    "ya_sin": "Ya, Seen. By the wise Qur'an.",
    "ha_meem": "Ha, Meem. By the clear Book.",
    
    // Mid-surah common themes
    "belief": "And those who believe and do righteous deeds - We will surely remove from them their misdeeds and will surely reward them according to the best of what they used to do.",
    "guidance": "That is the Book about which there is no doubt, a guidance for those conscious of Allah.",
    "mercy": "Your Lord has decreed upon Himself mercy: that any of you who does wrong out of ignorance and then repents after that and corrects himself - indeed, He is Forgiving and Merciful.",
    "warning": "So whoever does an atom's weight of good will see it, and whoever does an atom's weight of evil will see it.",
    
    // Final verse fallbacks
    "ending": "Indeed, your Lord knows, [O Muhammad], that you stand [in prayer] almost two thirds of the night or half of it or a third of it, and [so do] a group of those with you."
  };
  
  // Try to provide a meaningful fallback based on position in the surah
  if (ayahNumber === 1 && surahNumber !== 9) { // First verse (except Surah 9 which doesn't start with Bismillah)
    return commonVerses.bismillah;
  }
  
  // Specific fallback for Surah Al-Baqarah
  if (surahNumber === 2) {
    if (ayahNumber <= 5) {
      return [
        "Alif, Lam, Meem.",
        "This is the Book about which there is no doubt, a guidance for those conscious of Allah -",
        "Who believe in the unseen, establish prayer, and spend out of what We have provided for them,",
        "And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain [in faith].",
        "Those are upon [right] guidance from their Lord, and it is those who are the successful."
      ][ayahNumber - 1];
    }
  }
  
  // For specific surah types, provide more appropriate fallbacks
  if ([2, 3, 29, 30, 31, 32].includes(surahNumber) && ayahNumber <= 3) {
    return commonVerses.alif_lam_meem;
  }
  
  if (surahNumber === 36 && ayahNumber <= 3) { // Ya-Sin
    return commonVerses.ya_sin;
  }
  
  // Generate a more contextual placeholder translation
  const surahEnglishNames = [
    "Al-Fatihah", "Al-Baqarah", "Aali Imran", "An-Nisa", "Al-Ma'idah", "Al-An'am", 
    "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus", "Hud", "Yusuf", "Ar-Ra'd", 
    "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha", 
    "Al-Anbiya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", "Ash-Shu'ara", 
    "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajdah", 
    "Al-Ahzab", "Saba", "Fatir", "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar"
  ];
  
  const surahName = surahNumber <= surahEnglishNames.length 
    ? surahEnglishNames[surahNumber-1] 
    : `Surah ${surahNumber}`;
  
  return `Verse ${ayahNumber} of ${surahName}. [Actual translation will be added soon, In sha Allah]`;
}

/**
 * Parse the Quran XML file and extract a specific surah
 * @param {number} surahNumber - The surah number (1-114)
 * @returns {Object} The surah data with verses and translations
 */
function getSurah(surahNumber) {
  // Convert to number to ensure proper comparison
  surahNumber = parseInt(surahNumber, 10);
  
  // Return from cache if available
  if (surahCache[surahNumber]) {
    return surahCache[surahNumber];
  }

  try {
    // Path to the Quran XML file
    const xmlFilePath = path.join(process.cwd(), 'content/quran.xml');
    
    // Check if file exists
    if (!fs.existsSync(xmlFilePath)) {
      console.error(`Quran XML file not found at: ${xmlFilePath}`);
      return null;
    }
    
    // Read the XML file
    const xmlData = fs.readFileSync(xmlFilePath, 'utf8');
    
    // Parse the XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    
    // Check possible tag variations (sura, surah)
    let surahs = xmlDoc.getElementsByTagName('sura');
    if (surahs.length === 0) {
      surahs = xmlDoc.getElementsByTagName('surah');
    }
    
    // Check if any surahs were found
    if (surahs.length === 0) {
      console.error('No surahs found in the XML file. Check the XML structure.');
      return null;
    }
    
    let targetSurah = null;
    
    for (let i = 0; i < surahs.length; i++) {
      const surah = surahs[i];
      
      // Check for different attribute names (index/number)
      let index = parseInt(surah.getAttribute('index'), 10);
      if (isNaN(index)) {
        index = parseInt(surah.getAttribute('number'), 10);
      }
      
      if (index === surahNumber) {
        targetSurah = surah;
        break;
      }
    }
    
    // If not found by index, try finding by position (index starts from 0)
    if (!targetSurah && surahNumber <= surahs.length) {
      targetSurah = surahs[surahNumber - 1];
    }
    
    if (!targetSurah) {
      console.error(`Surah ${surahNumber} not found in XML file`);
      return null;
    }
    
    // Extract surah details with fallbacks
    const surahName = targetSurah.getAttribute('name') || `سورة ${surahNumber}`;
    
    // Use preset English names if available
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
    
    const englishName = targetSurah.getAttribute('englishName') || 
                       (surahNumber <= englishNames.length ? englishNames[surahNumber-1] : `Surah ${surahNumber}`);
    
    const englishNameTranslation = targetSurah.getAttribute('englishNameTranslation') || '';
    const revelationType = targetSurah.getAttribute('revelationType') || 
                          targetSurah.getAttribute('type') || 'Meccan';
    
    // Extract ayahs (verses) - check for variations (aya, ayah)
    let ayahNodes = targetSurah.getElementsByTagName('aya');
    if (ayahNodes.length === 0) {
      ayahNodes = targetSurah.getElementsByTagName('ayah');
    }
    
    if (ayahNodes.length === 0) {
      console.error(`No ayahs found in Surah ${surahNumber}. Check the XML structure.`);
      // Create a single sample ayah as fallback
      return {
        number: surahNumber,
        name: surahName,
        englishName,
        englishNameTranslation,
        revelationType,
        ayahs: [{
          number: 1,
          text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful'
        }]
      };
    }
    
    const ayahs = [];
    
    for (let i = 0; i < ayahNodes.length; i++) {
      const ayah = ayahNodes[i];
      
      // Check for different attribute names (index/number)
      let ayahNumber = parseInt(ayah.getAttribute('index'), 10);
      if (isNaN(ayahNumber)) {
        ayahNumber = parseInt(ayah.getAttribute('number'), 10);
      }
      if (isNaN(ayahNumber)) {
        ayahNumber = i + 1; // Use position as fallback
      }
      
      // Get Arabic text with fallbacks to different attributes and content
      let text = ayah.getAttribute('text');
      if (!text) {
        text = ayah.getAttribute('arabic');
      }
      if (!text) {
        // Look for direct text content or nested elements
        text = ayah.textContent.trim();
      }
      
      // TRY TO GET TRANSLATION FROM XML FIRST
      // Check multiple possible attribute/element names for translations
      let translation = '';
      
      // 1. Check for translation as an attribute
      translation = ayah.getAttribute('translation') || 
                   ayah.getAttribute('english') || 
                   ayah.getAttribute('en');
      
      // 2. Check for translation in child elements
      if (!translation) {
        const translationElements = ayah.getElementsByTagName('translation');
        if (translationElements.length > 0) {
          translation = translationElements[0].textContent.trim();
        }
        
        if (!translation) {
          const enElements = ayah.getElementsByTagName('en');
          if (enElements.length > 0) {
            translation = enElements[0].textContent.trim();
          }
        }
        
        if (!translation) {
          const textElements = ayah.getElementsByTagName('text');
          for (let j = 0; j < textElements.length; j++) {
            const langAttr = textElements[j].getAttribute('lang');
            if (langAttr && (langAttr.toLowerCase() === 'en' || langAttr.toLowerCase() === 'english')) {
              translation = textElements[j].textContent.trim();
              break;
            }
          }
        }
      }
      
      // 3. If still no translation, check for translation as a node with specific type attribute
      if (!translation) {
        // Find all child nodes
        for (let j = 0; j < ayah.childNodes.length; j++) {
          const node = ayah.childNodes[j];
          if (node.nodeType === 1) { // Is an element node
            const typeAttr = node.getAttribute('type');
            if (typeAttr && (typeAttr.toLowerCase() === 'translation' || typeAttr.toLowerCase() === 'english')) {
              translation = node.textContent.trim();
              break;
            }
          }
        }
      }
      
      // Fallback to our cache or generate placeholder if no translation found in XML
      if (!translation) {
        translation = getTranslation(surahNumber, ayahNumber);
      }
      
      // Add transliteration if available
      let transliteration = '';
      
      // Check for transliteration in various formats
      transliteration = ayah.getAttribute('transliteration') || 
                       ayah.getAttribute('latin');
      
      if (!transliteration) {
        const translitElements = ayah.getElementsByTagName('transliteration');
        if (translitElements.length > 0) {
          transliteration = translitElements[0].textContent.trim();
        }
        
        if (!transliteration) {
          const latinElements = ayah.getElementsByTagName('latin');
          if (latinElements.length > 0) {
            transliteration = latinElements[0].textContent.trim();
          }
        }
      }
      
      // Build the ayah object
      const ayahObj = {
        number: ayahNumber,
        text,
        translation
      };
      
      // Only add transliteration if available
      if (transliteration) {
        ayahObj.transliteration = transliteration;
      }
      
      ayahs.push(ayahObj);
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

// Helper to get XML structure info for debugging
function getXmlStructureInfo() {
  try {
    const xmlFilePath = path.join(process.cwd(), 'content/quran.xml');
    
    if (!fs.existsSync(xmlFilePath)) {
      return { error: `File not found at ${xmlFilePath}` };
    }
    
    const stats = fs.statSync(xmlFilePath);
    const xmlData = fs.readFileSync(xmlFilePath, 'utf8');
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    
    // Check for different tag names
    const rootElement = xmlDoc.documentElement;
    const suraCount = xmlDoc.getElementsByTagName('sura').length;
    const surahCount = xmlDoc.getElementsByTagName('surah').length;
    const ayaCount = xmlDoc.getElementsByTagName('aya').length;
    const ayahCount = xmlDoc.getElementsByTagName('ayah').length;
    
    // Get a sample of the first part of the file
    const sample = xmlData.substring(0, 500) + '...';
    
    return {
      fileSize: `${(stats.size / 1024 / 1024).toFixed(2)} MB`,
      rootElement: rootElement.tagName,
      suraCount,
      surahCount,
      ayaCount,
      ayahCount,
      sample
    };
  } catch (error) {
    return { error: error.message };
  }
}

// GET handler for all surahs
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const surahNumber = searchParams.get('surah');
  const debug = searchParams.get('debug');
  
  // Debug mode to get XML structure info
  if (debug === 'xml') {
    const structureInfo = getXmlStructureInfo();
    return NextResponse.json(structureInfo);
  }
  
  if (surahNumber) {
    // Get specific surah if number is provided
    const data = getSurah(parseInt(surahNumber, 10));
    if (!data) {
      return NextResponse.json(
        { error: `Surah ${surahNumber} not found`, 
          debug: getXmlStructureInfo() 
        }, 
        { status: 404 }
      );
    }
    return NextResponse.json(data);
  } else {
    // Get all surahs
    const surahs = getAllSurahs();
    if (surahs.length === 0) {
      return NextResponse.json(
        { error: 'No surahs found in the XML file', 
          debug: getXmlStructureInfo() 
        }, 
        { status: 404 }
      );
    }
    return NextResponse.json(surahs);
  }
} 