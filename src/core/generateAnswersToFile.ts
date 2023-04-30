import { generateAnswer } from "./generateAnswer";
import { readFile, writeFile } from "../utils/fileHandler";

type QuestionAnswer = {
  question: string;
  answer: string;
};

export async function generateAnswersToTxtFile(outputFile: string, questionsFilePath: string): Promise<void> {
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

export async function generateAnswersToJsonFile(dataFilePath: string): Promise<void> {
  const data: QuestionAnswer[] = JSON.parse(readFile(dataFilePath));
  const questions = data.map((item) => item.question);
  console.log("Loading...");

  const answers = await generateFormattedAnswersAsync(questions);

  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    item.answer = answers[index];
  }

  writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

async function generateFormattedAnswersAsync(questions: string[]): Promise<string[]> {
  const answers = await Promise.all(questions.map((question) => generateAnswer(question)));
  const formattedAnswers = answers.map((answer, index) => `${answer}`);

  return formattedAnswers;
}


