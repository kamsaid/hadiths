import fs from 'fs';
import path from 'path';
import { DOMParser } from 'xmldom';

/**
 * Debug script to analyze the Quran XML file structure
 * This script helps identify issues with the XML file format
 */

// Run this function to check the XML structure
export async function checkXmlStructure() {
  try {
    console.log('🔍 Starting Quran XML structure analysis...');
    
    // Path to the Quran XML file
    const xmlFilePath = path.join(process.cwd(), 'content/quran.xml');
    
    // Check if file exists
    if (!fs.existsSync(xmlFilePath)) {
      console.error('❌ ERROR: Quran XML file not found at:', xmlFilePath);
      return { error: 'File not found' };
    }
    
    console.log('✅ XML file found at:', xmlFilePath);
    
    // Get file stats
    const stats = fs.statSync(xmlFilePath);
    const fileSizeInMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`📊 File size: ${fileSizeInMB} MB`);
    
    // Read the XML file
    const xmlData = fs.readFileSync(xmlFilePath, 'utf8');
    console.log(`📝 Read ${xmlData.length} characters of XML data`);
    
    // Parse the XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    
    // Get the root element
    const rootElement = xmlDoc.documentElement;
    console.log(`🌳 Root element: <${rootElement.tagName}>`);
    
    // Count different tag types
    const suraElements = xmlDoc.getElementsByTagName('sura');
    const surahElements = xmlDoc.getElementsByTagName('surah');
    const ayaElements = xmlDoc.getElementsByTagName('aya');
    const ayahElements = xmlDoc.getElementsByTagName('ayah');
    
    console.log('📚 Element counts:');
    console.log(`  - <sura> tags: ${suraElements.length}`);
    console.log(`  - <surah> tags: ${surahElements.length}`);
    console.log(`  - <aya> tags: ${ayaElements.length}`);
    console.log(`  - <ayah> tags: ${ayahElements.length}`);
    
    // Determine which tags are being used
    const usingSura = suraElements.length > 0;
    const usingSurah = surahElements.length > 0;
    const usingAya = ayaElements.length > 0;
    const usingAyah = ayahElements.length > 0;
    
    console.log('🔍 Tag format detection:');
    console.log(`  - Using <sura> format: ${usingSura ? 'Yes' : 'No'}`);
    console.log(`  - Using <surah> format: ${usingSurah ? 'Yes' : 'No'}`);
    console.log(`  - Using <aya> format: ${usingAya ? 'Yes' : 'No'}`);
    console.log(`  - Using <ayah> format: ${usingAyah ? 'Yes' : 'No'}`);
    
    // Get a sample of the structure
    const surahs = usingSura ? suraElements : (usingSurah ? surahElements : []);
    const sampleSurah = surahs.length > 0 ? surahs[0] : null;
    
    if (sampleSurah) {
      console.log('📋 Sample structure from first surah:');
      console.log('  Attributes:');
      
      const attributes = sampleSurah.attributes;
      for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        console.log(`    - ${attr.name}: ${attr.value}`);
      }
      
      // Check for ayahs
      const ayahElements = usingAya ? 
        sampleSurah.getElementsByTagName('aya') : 
        (usingAyah ? sampleSurah.getElementsByTagName('ayah') : []);
      
      if (ayahElements.length > 0) {
        const sampleAyah = ayahElements[0];
        console.log('  Sample Ayah Attributes:');
        
        const ayahAttributes = sampleAyah.attributes;
        for (let i = 0; i < ayahAttributes.length; i++) {
          const attr = ayahAttributes[i];
          console.log(`    - ${attr.name}: ${attr.value}`);
        }
      } else {
        console.log('  ❌ No ayahs found in the first surah!');
      }
    } else {
      console.log('❌ Could not find any surahs in the XML file!');
    }
    
    // Check for common issues
    const issues = [];
    
    if (!usingSura && !usingSurah) {
      issues.push('No <sura> or <surah> tags found in the XML file');
    }
    
    if (!usingAya && !usingAyah) {
      issues.push('No <aya> or <ayah> tags found in the XML file');
    }
    
    if (sampleSurah) {
      const hasIndexAttr = sampleSurah.hasAttribute('index');
      const hasNumberAttr = sampleSurah.hasAttribute('number');
      
      if (!hasIndexAttr && !hasNumberAttr) {
        issues.push('Surahs do not have index or number attributes');
      }
      
      const ayahElements = usingAya ? 
        sampleSurah.getElementsByTagName('aya') : 
        (usingAyah ? sampleSurah.getElementsByTagName('ayah') : []);
      
      if (ayahElements.length > 0) {
        const sampleAyah = ayahElements[0];
        const hasAyahIndexAttr = sampleAyah.hasAttribute('index');
        const hasAyahNumberAttr = sampleAyah.hasAttribute('number');
        
        if (!hasAyahIndexAttr && !hasAyahNumberAttr) {
          issues.push('Ayahs do not have index or number attributes');
        }
        
        const hasTextAttr = sampleAyah.hasAttribute('text');
        const hasArabicAttr = sampleAyah.hasAttribute('arabic');
        
        if (!hasTextAttr && !hasArabicAttr) {
          issues.push('Ayahs do not have text or arabic attributes');
        }
      }
    }
    
    if (issues.length > 0) {
      console.log('❌ Potential issues detected:');
      issues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue}`);
      });
    } else {
      console.log('✅ No obvious issues detected in the XML structure');
    }
    
    // Return a summary
    return {
      fileSize: `${fileSizeInMB} MB`,
      rootElement: rootElement.tagName,
      suraCount: suraElements.length,
      surahCount: surahElements.length,
      ayaCount: ayaElements.length,
      ayahCount: ayahElements.length,
      tagFormat: {
        usingSura,
        usingSurah,
        usingAya,
        usingAyah
      },
      issues
    };
  } catch (error) {
    console.error('❌ ERROR during XML analysis:', error);
    return { error: error.message };
  }
}

// Run the check if this module is executed directly
if (require.main === module) {
  checkXmlStructure()
    .then(result => {
      console.log('✅ Analysis complete');
    })
    .catch(error => {
      console.error('❌ Analysis failed:', error);
    });
} 