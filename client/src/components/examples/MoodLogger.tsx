import { ThemeProvider } from "../ThemeProvider";
import { MoodLogger } from "../MoodLogger";

export default function MoodLoggerExample() {
  return (
    <ThemeProvider>
      <div className="p-8 flex items-center justify-center min-h-screen bg-background">
        <MoodLogger />
      </div>
    </ThemeProvider>
  );
}
