import { generateAnswer } from "./generateAnswer";
import { readFile, writeFile } from "../utils/fileHandler";

export async function generateAnswersToFile(outputFile: string, questionsFilePath: string): Promise<void> {
  const questions = readFile(questionsFilePath).split("\n").filter(Boolean);
  console.log("Loading...");

  const answers = await generateFormattedAnswers(questions);

  writeFile(outputFile, answers.join("\n"));

  console.log(
    `Generated answers for ${questions.length} questions and wrote them to ${outputFile}`
  );
}

async function generateFormattedAnswers(questions: string[]): Promise<string[]> {
  const formattedAnswers: string[] = [];

  for (let index = 0; index < questions.length; index++) {
    const question = questions[index];
    const answer = await generateAnswer(question);
    const formattedAnswer = `Answer ${index + 1}: ${answer}`;
    formattedAnswers.push(formattedAnswer);
  }

  return formattedAnswers;
}



