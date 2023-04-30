import { Configuration } from "openai";
import { config } from "dotenv";

config();

export const openAiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
