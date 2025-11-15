import { ThemeProvider } from "../ThemeProvider";
import { DoodlePad } from "../DoodlePad";

export default function DoodlePadExample() {
  return (
    <ThemeProvider>
      <div className="p-8 flex items-center justify-center min-h-screen bg-background">
        <DoodlePad />
      </div>
    </ThemeProvider>
  );
}
