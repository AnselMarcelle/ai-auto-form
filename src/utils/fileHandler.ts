import { readFileSync, writeFileSync } from "fs";

export function saveTextsToFile(texts: string[], filename: string): void {
  const fileContent = texts.join("\n");
  writeFileSync(filename, fileContent, "utf8");
}

export function readFile(filename: string): string {
  return readFileSync(filename, "utf8");
}

export function writeFile(filename: string, content: string): void {
  writeFileSync(filename, content, "utf8");
}
