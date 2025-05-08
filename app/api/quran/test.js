const fs = require('fs');
const path = require('path');
const { DOMParser } = require('xmldom');

/**
 * Direct test of the Quran API functionality
 * This script runs the same parsing logic outside of the API route
 */

// Run this manually with: node app/api/quran/test.js

// Path to the Quran XML file
const xmlFilePath = path.join(process.cwd(), 'content/quran.xml');

// Test getting a specific surah
async function testGetSurah(surahNumber) {
  console.log(`\n📖 Testing getSurah(${surahNumber})...`);
  
  try {
    // Check if file exists
    if (!fs.existsSync(xmlFilePath)) {
      console.error(`❌ ERROR: Quran XML file not found at: ${xmlFilePath}`);
      return null;
    }
    
    // Read the XML file
    const xmlData = fs.readFileSync(xmlFilePath, 'utf8');
    
    // Parse the XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    
    // Find the surah by its index attribute
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
    
    // If not found by index, try finding by position
    if (!targetSurah && surahNumber <= surahs.length) {
      targetSurah = surahs[surahNumber - 1];
    }
    
    if (!targetSurah) {
      console.error(`❌ Surah ${surahNumber} not found in XML file`);
      return null;
    }
    
    // Extract surah details with fallbacks
    const surahName = targetSurah.getAttribute('name') || `سورة ${surahNumber}`;
    const englishName = `Surah ${surahNumber}`;
    const englishNameTranslation = '';
    const revelationType = targetSurah.getAttribute('type') || 'Meccan';
    
    // Extract ayahs
    const ayahNodes = targetSurah.getElementsByTagName('aya');
    const ayahs = [];
    
    console.log(`  Found surah: ${surahName} with ${ayahNodes.length} verses`);
    
    // Extract and log a few sample verses
    for (let i = 0; i < Math.min(3, ayahNodes.length); i++) {
      const ayah = ayahNodes[i];
      const ayahNumber = parseInt(ayah.getAttribute('index'), 10);
      
      // Get text & translation
      const text = ayah.getAttribute('text') || ayah.textContent.trim();
      
      // Add to the collection
      ayahs.push({
        number: ayahNumber,
        text,
        translation: ''  // Translations may need to be added separately
      });
      
      console.log(`  - Ayah ${ayahNumber}: ${text.substring(0, 30)}...`);
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
    
    return surahData;
  } catch (error) {
    console.error(`❌ ERROR parsing Surah ${surahNumber}:`, error);
    return null;
  }
}

// Test getting all surahs
async function testGetAllSurahs() {
  console.log('\n📚 Testing getAllSurahs()...');
  
  try {
    // Check if file exists
    if (!fs.existsSync(xmlFilePath)) {
      console.error(`❌ ERROR: Quran XML file not found at: ${xmlFilePath}`);
      return [];
    }
    
    // Read the XML file
    const xmlData = fs.readFileSync(xmlFilePath, 'utf8');
    
    // Parse the XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    
    // Find all surahs
    const surahs = xmlDoc.getElementsByTagName('sura');
    console.log(`  Found ${surahs.length} surahs in the XML file`);
    
    const surahList = [];
    
    // Process a few sample surahs
    for (let i = 0; i < Math.min(5, surahs.length); i++) {
      const surah = surahs[i];
      const index = parseInt(surah.getAttribute('index'), 10);
      const name = surah.getAttribute('name') || `سورة ${index}`;
      const revelationType = surah.getAttribute('type') || 'Meccan';
      
      // Count ayahs
      const ayahCount = surah.getElementsByTagName('aya').length;
      
      surahList.push({
        number: index,
        name,
        englishName: `Surah ${index}`,
        englishNameTranslation: '',
        revelationType,
        ayahCount
      });
      
      console.log(`  - Surah ${index}: ${name} (${ayahCount} verses)`);
    }
    
    // Log the total count
    console.log(`  Successfully processed ${surahList.length} surahs`);
    
    return surahList;
  } catch (error) {
    console.error('❌ ERROR getting all surahs:', error);
    return [];
  }
}

// Run the tests
async function runTests() {
  console.log('🧪 Starting Quran API tests...');
  
  // Test getAllSurahs
  await testGetAllSurahs();
  
  // Test getSurah for a few different surahs
  await testGetSurah(1);  // Al-Fatihah
  await testGetSurah(2);  // Al-Baqarah
  await testGetSurah(36); // Ya-Sin
  
  console.log('\n✅ Tests completed');
}

// Run the tests
runTests(); 