import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({
    baseURL: process.env.OPENAI_API_BASE,
    apiKey: process.env.OPENAI_API_KEY,
});


export default openai