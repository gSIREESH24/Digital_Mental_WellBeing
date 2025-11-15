import { ThemeProvider } from "../ThemeProvider";
import { ChatBot } from "../ChatBot";

export default function ChatBotExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <ChatBot />
      </div>
    </ThemeProvider>
  );
}
