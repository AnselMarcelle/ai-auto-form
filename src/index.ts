import { extractSpanTexts } from "./core/extractText";
import { saveTextsToFile, readFile } from "./utils/fileHandler";
import { join } from "path";
import { generateAnswersToFile } from "./core/generateAnswersToFile";
import prompts from "prompts";

const htmlFilePath = join(__dirname, "../data/example.html");
const questionsFilePath = join(__dirname, "../data/questions.txt");
const answersFilePath = join(__dirname, "../data/answers.txt");

// Extract questions and save them to questions.txt
const htmlString = readFile(htmlFilePath);
const texts = extractSpanTexts(htmlString, "M7eMe");

async function main() {
  const { action } = await prompts([
    {
      type: "select",
      name: "action",
      message: "Choose an option:",
      choices: [
        { value: "saveTexts", title: "Save texts to file" },
        { value: "generateAnswers", title: "Generate answers" },
        { value: "both", title: "Both" },
      ],
    },
  ]);

  if (action === "saveTexts" || action === "both") {
    saveTextsToFile(texts, questionsFilePath);
    console.log("Texts saved to questions.txt");
  }

  if (action === "generateAnswers" || action === "both") {
    generateAnswersToFile(answersFilePath, questionsFilePath);
  }
}

main();
