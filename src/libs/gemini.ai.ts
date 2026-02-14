import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import { extractText } from "../utils/helper";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY ?? "";
const genAI = new GoogleGenerativeAI(apiKey);

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export class AIclientAdapter {
    async analyseImage(): Promise<string> {
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        const result = await model.generateContent("WHO is PM of india");
        const response = await result.response;
        return response.text();
    }

    async analyseImageHaiku(task: string): Promise<string> {
        const image = fs.readFileSync("./sample.png").toString("base64");
        const prompt = ` You are an image evaluator.
                         Instruction: "${task}"
                         Analyze the given image based only on the instruction.
                         Scoring Rules:
                            - 0-30: Instruction not followed
                            - 31-60: Partially followed
                            - 61-85: Mostly correct
                            - 86-100: Excellent match
                         Output JSON only. No text. No markdown. No explanation.
                         {
                                "score": number,
                                "reason": "max 20 words"
                        }
                        `
        const response = await client.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 400,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "image",
                            source: { type: "base64", media_type: "image/png", data: image },
                        },
                        {
                            type: "text",
                            text: prompt,
                        },
                    ],
                },
            ],
        });
        return extractText(response.content);
    }
}
