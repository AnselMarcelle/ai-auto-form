import { OpenAIApi } from "openai";
import { openAiConfig } from "../utils/config.js";

const openai = new OpenAIApi(openAiConfig);

const prompt = (question: string) => `${question} Seja objetivo:`;

export async function generateAnswer(question: string): Promise<string> {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt(question) }],
    temperature: 0.7,
  });

  const answer = response.data.choices[0].message?.content || "no answer";

  return answer;
}


