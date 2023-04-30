// extractText.ts

import * as fs from 'fs';
import { JSDOM } from 'jsdom';

function extractSpanTexts(html: string, className: string): string[] {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const spanElements = doc.getElementsByClassName(className);
  const spanTexts: string[] = [];

  for (let i = 0; i < spanElements.length; i++) {
      const textContent = spanElements[i].textContent || '';
      const cleanedText = textContent.replace(/\n/g, '').replace(/\s+/g, ' '); // Remove newline characters and replace multiple spaces with a single space
      spanTexts.push(cleanedText);
  }

  return spanTexts;
}



function saveTextsToFile(texts: string[], filename: string): void {
    const fileContent = texts.join('\n');
    fs.writeFileSync(filename, fileContent, 'utf8');
}

// Read the HTML content from the file
const htmlString = fs.readFileSync('src/example.html', 'utf8');

const texts = extractSpanTexts(htmlString, 'M7eMe');
saveTextsToFile(texts, 'questions.txt');
console.log('Texts saved to questions.txt');
