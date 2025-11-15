import { ThemeProvider } from "../ThemeProvider";
import { PanicButton } from "../PanicButton";

export default function PanicButtonExample() {
  return (
    <ThemeProvider>
      <div className="p-8 flex items-center justify-center min-h-screen bg-background">
        <PanicButton />
      </div>
    </ThemeProvider>
  );
}
