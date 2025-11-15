import { Express, Request, Response } from "express";
import { createServer, Server } from "http";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDnP4F0Ca9UC_HEADM49A5peeD5XuFBHzQ");

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ----------------------------
  // POST /api/mood   (Gemini only)
  // ----------------------------
  app.post("/api/mood", async (req: Request, res: Response) => {
    try {
      const { image } = req.body;

      if (!image) {
        return res.status(400).json({ error: "No image provided" });
      }

      // Prepare Gemini model
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const prompt = `
        You are a mood analyzer.
        Given a person's face image, describe their emotion in one word:
        (happy, sad, angry, neutral, fear, disgust, or surprise).
        Respond with only the emotion word.
      `;

      // Remove Base64 header
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

      // Send request to Gemini
      const result = await model.generateContent([
        { inlineData: { data: base64Data, mimeType: "image/jpeg" } },
        { text: prompt },
      ]);

      const mood = result.response.text().trim().toLowerCase();

      // Return only mood (no DB)
      return res.json({
        emotion: mood,
      });

    } catch (err) {
      console.error("Error analyzing mood:", err);
      return res.status(500).json({ error: "Error analyzing mood" });
    }
  });

  // ----------------------------
  // Create HTTP Server
  // ----------------------------
  const httpServer = createServer(app);
  return httpServer;
}
