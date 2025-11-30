import { Express, Request, Response } from "express";
import { createServer, Server } from "http";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBWnwkz-eCw_GeoG2huCAAneTcmTYBxF6Y");

function formatBotResponse(text: string) {
  return text
    // Convert Gemini headings like **Heading** into <h3>
    .replace(/\*\*(.+?)\*\*/g, "<h3>$1</h3>")
    // Convert *emphasis* to <strong>
    .replace(/\*(.+?)\*/g, "<strong>$1</strong>")
    // Replace line breaks with <br>
    .replace(/\n/g, "<br>");
}


export async function registerRoutes(app: Express): Promise<Server> {

  app.post("/api/mood", async (req: Request, res: Response) => {
    try {
      const { image } = req.body;

      if (!image) {
        return res.status(400).json({ error: "No image provided" });
      }

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const prompt = `
        You are a mood analyzer.
        Given a person's face image, describe their emotion in one word:
        (happy, sad, angry, neutral, fear, disgust, or surprise).
        Respond with only the emotion word.
      `;

      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

      const result = await model.generateContent([
        { inlineData: { data: base64Data, mimeType: "image/jpeg" } },
        { text: prompt },
      ]);

      const mood = result.response.text().trim().toLowerCase();

      return res.json({
        emotion: mood,
      });

    } catch (err) {
      console.error("Error analyzing mood:", err);
      return res.status(500).json({ error: "Error analyzing mood" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      type ChatMessage = { sender: "user" | "bot" | string; text: string };
      let { messages }: { messages: ChatMessage[] } = req.body;

      // Remove initial bot greeting
      if (messages.length > 0 && messages[0].sender === "bot") {
        messages = messages.slice(1);
      }

      // Convert chat history
      const formattedHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      const userMessage = messages[messages.length - 1].text;

      // Analyze category from user message
      const categoryModel = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const categoryPrompt = `Analyze this mental health concern and return ONLY one of these categories: Anxiety, Depression, Stress, Sleep, Relationships, or "None" if it doesn't fit any category. Just return the category name, nothing else.

User message: "${userMessage}"

Category:`;

      let detectedCategory: string | null = null;
      try {
        const categoryResponse = await categoryModel.generateContent(categoryPrompt);
        const categoryText = categoryResponse.response.text().trim();
        const validCategories = ["Anxiety", "Depression", "Stress", "Sleep", "Relationships"];
        if (validCategories.includes(categoryText)) {
          detectedCategory = categoryText;
        }
      } catch (err) {
        console.error("Category detection error:", err);
      }

      // MODEL SETUP WITH SYSTEM INSTRUCTION ONLY HERE
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: `
You are a mental health support chatbot.
dont ask many questions to user give the options or tell for general case
Return ALL responses ONLY in this EXACT HTML-like structure:

RULES:
- Use <h> for headings.
- Use <p> for paragraphs.
- Use <li> for bullet points.
- Use <b> for bold.
- NEVER use markdown.
- NO ###, **, *, or any markdown characters.
- Do not add extra text outside the tags.
`,
      });

      const chatSession = model.startChat({
        history: formattedHistory,
      });

      const response = await chatSession.sendMessage(userMessage);
      const rawText = response.response.text();
      const formatted = formatBotResponse(rawText);
      console.log("Formatted bot response:", formatted);
      res.json({
        reply: formatted,
        category: detectedCategory
      });
    } catch (error) {
      console.error("Gemini error:", error);
      res.status(500).json({ error: "Gemini failed" });
    }
  });


  const httpServer = createServer(app);
  return httpServer;
}