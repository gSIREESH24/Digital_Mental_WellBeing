
import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";


const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

async function startServer() {
  registerRoutes(app);
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("🔥 Error:", err);
    const status = err.status || 500;
    res.status(status).json({ message: err.message || "Internal Server Error" });
  });

  const server = createServer(app);
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const PORT = parseInt(process.env.PORT || "5000", 10);
  const HOST = "0.0.0.0";

  server.listen(PORT, HOST, () => {
    log(`✅ MindEase Campus running at http://${HOST}:${PORT}`);
  });
}

startServer();
