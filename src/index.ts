import { generateAnswer } from "./core/generateAnswer";
import { extractSpanTexts } from "./core/extractText";
import { saveTextsToFile, readFile } from "./utils/fileHandler";
import { join } from "path";
import { generateAnswersToFile } from "./core/generateAnswersToFile";

const htmlFilePath = join(__dirname, "../data/example.html");
const questionsFilePath = join(__dirname, "../data/questions.txt");
const answersFilePath = join(__dirname, "../data/answers.txt");

// Extract questions and save them to questions.txt
const htmlString = readFile(htmlFilePath);
const texts = extractSpanTexts(htmlString, "M7eMe");

saveTextsToFile(texts, questionsFilePath);

console.log("Texts saved to questions.txt");

generateAnswersToFile(answersFilePath, questionsFilePath);
