import { Configuration, OpenAIApi } from "openai";
import { writeFileSync, readFileSync } from "fs";
import dotenv from "dotenv";
dotenv.config();

// Replace these values with your OpenAI API key and model ID
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize the OpenAI API client with your API key
const openai = new OpenAIApi(config);

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

// Define a function to generate answers for all questions in the file and write them to a file
async function generateAnswersToFile(outputFile: string): Promise<void> {
  const questions = readFileSync("questions.txt", "utf-8").split("\n").filter(Boolean);
  const answers: string[] = [];
  console.log('Loading...')

  // Wait for all promises to resolve before writing to the file
  await Promise.all(
    questions.map(async (question, index) => {
      const answer = await generateAnswer(question);
      const formattedAnswer = `Answer ${index + 1}: ${answer}`;
      answers.push(formattedAnswer);
    })
  );

  // Write the generated answers to a file
  writeFileSync(outputFile, answers.join("\n"));

  console.log(
    `Generated answers for ${questions.length} questions and wrote them to ${outputFile}`
  );
}

// Call the generateAnswersToFile function with the output file name
generateAnswersToFile('answers.txt');
