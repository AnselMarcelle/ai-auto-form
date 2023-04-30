import { readFileSync, writeFileSync } from "fs";

export function saveTextsToTxtFile(texts: string[], filename: string): void {
  const fileContent = texts.join("\n");
  writeFileSync(filename, fileContent, "utf8");
}

export function saveTextToJsonFile(texts: string[], filename: string): void {
  const json = texts.map((text) => ({ question: text, answer: "" }));
  const fileContent = JSON.stringify(json, null, 2);
  writeFileSync(filename, fileContent, "utf8");
}

export function updateJsonFile(filename: string, data: any): void {
  const fileContent = JSON.stringify(data, null, 2);
  writeFileSync(filename, fileContent, "utf8");
}

export function readFile(filename: string): string {
  return readFileSync(filename, "utf8");
}

export function writeFile(filename: string, content: string): void {
  writeFileSync(filename, content, "utf8");
}
