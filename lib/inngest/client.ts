import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "signalist",
  ai: { gemini: { apiKey: process.env.GEMINI_API_KEY! } }, // 10req/min, 250k input token/min, 20 req/day for gemini-2.5-flash-lite model
});
