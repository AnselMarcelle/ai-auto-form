import { extractSpanTexts } from "./core/extractText";
import {
  readFile,
  saveTextToJsonFile,
} from "./utils/fileHandler";
import { join } from "path";
import { generateAnswersToJsonFile } from "./core/generateAnswersToFile";
import prompts from "prompts";

const htmlFilePath = join(__dirname, "../data/form.html");
const dataFilePath = join(__dirname, "../data/data.json");

async function main() {
  const { inputMethod } = await prompts([
    {
      type: "select",
      name: "inputMethod",
      message: "How do you want to input the questions?",
      choices: [
        { value: "form", title: "Use a form" },
        { value: "type", title: "Type the questions" },
      ],
    },
  ]);

  if (inputMethod === "form") {
    console.log("Please fill the form.html in the data folder with the source code of the Google Form. Remember to save the file.");
  } else if (inputMethod === "type") {
    console.log("Please type the questions divided by 'Enter key' in the questions.txt file in the data folder. Remember to save the file.");
  }

  const { filledData } = await prompts([
    {
      type: "select",
      name: "filledData",
      message: "Have you filled the question data?",
      choices: [
        { value: "yes", title: "Yes" },
        { value: "no", title: "No" },
      ],
    },
  ]);

  if (filledData === "yes") {
    // Extract questions and save them to questions.txt
    const htmlString = readFile(htmlFilePath);
    const texts = extractSpanTexts(htmlString, "M7eMe");

    saveTextToJsonFile(texts, dataFilePath);
    console.log("Data saved.")
  } else if (filledData === "no") {
    console.log("Please fill the question data, otherwise the script won't work.");
    return;
  }

  const { action } = await prompts([
    {
      type: "select",
      name: "action",
      message: "Do you want to generate answers?",
      choices: [
        { value: "yes", title: "Yes" },
        { value: "no", title: "No" },
      ],
    },
  ]);

  if (action === "yes") {
    // Replace these two lines with the appropriate function for generating answers.
    await generateAnswersToJsonFile(dataFilePath);
    console.log("Answers generated.");
  } else if (action === "no") {
    console.log("No answers generated.");
    return;
  }
}

main();
