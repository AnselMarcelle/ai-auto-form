import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from "fs";
import dotenv from "dotenv";
dotenv.config();

// Replace these values with your OpenAI API key and model ID
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize the OpenAI API client with your API key
const openai = new OpenAIApi(config);

const questions = ["Me recomende um bom monitor para trabalho sendo um desenvolvedor", "Diga os personagens mais famosos de Naruto e detlahe a participação deles na tripulação"];

const prompt = (question: string) => `${question} Seja objetivo:`;

async function generateAnswer(question: string): Promise<string> {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt(question) }],
    temperature: 0.7,
    // max_tokens: 300,
  });

  const answer = response.data.choices[0].message?.content || "no answer";

  return answer;
}

// Define a function to generate answers for all questions in the array and write them to a file
async function generateAnswersToFile(
  questions: string[],
  outputFile: string
): Promise<void> {
  const answers: string[] = [];

  for (const question of questions) {
    const answer = await generateAnswer(question);
    answers.push(answer);
  }

  // Write the generated answers to a file
  writeFileSync(outputFile, answers.join("\n"));

  console.log(
    `Generated answers for ${questions.length} questions and wrote them to ${outputFile}`
  );
}

// Call the generateAnswersToFile function with the array of questions and the output file name
generateAnswersToFile(questions, 'answers.txt');
// printAnswer(questions[0]);
