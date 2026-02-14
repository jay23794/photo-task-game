import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY ?? "";
const genAI = new GoogleGenerativeAI(apiKey);

export class GeminiAIFlashClient {
    async analyseImage(): Promise<string> {
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        const result = await model.generateContent("WHO is PM of india");
        const response = await result.response;
        console.log(response.text());
        return response.text()
    }
}