import { JSDOM } from "jsdom";

export function extractSpanTexts(html: string, className: string): string[] {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const spanElements = doc.getElementsByClassName(className);
  const spanTexts: string[] = [];

  for (let i = 0; i < spanElements.length; i++) {
    const textContent = spanElements[i].textContent || '';
    const cleanedText = textContent.replace(/\n/g, '').replace(/\s+/g, ' ');
    spanTexts.push(cleanedText);
  }

  // remove the first element, which is the title
  spanTexts.shift();

  return spanTexts;
}

