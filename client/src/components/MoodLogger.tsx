import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EmotionModelViewer } from "./EmotionModelViewer";

export function MoodLogger() {
  const [note, setNote] = useState("");
  const [currentEmotion, setCurrentEmotion] = useState<"happy" | "sad" | "angry" | "idle" | "fear" | "surprise">("idle");

  // Get emotion from MoodScanner (localStorage) when component mounts or updates
  useEffect(() => {
    const getEmotionFromScanner = (): "happy" | "sad" | "angry" | "idle" | "fear" | "surprise" => {
      const today = new Date().toDateString();
      
      // Check for scanner emotion first
      const scannerEmotion = localStorage.getItem(`scanner_emotion_${today}`);
      if (scannerEmotion) {
        const emotion = scannerEmotion.toLowerCase();
        // Map scanner emotions to supported emotions
        if (emotion === "happy") return "happy";
        if (emotion === "surprise") return "surprise";
        if (emotion === "sad") return "sad";
        if (emotion === "angry") return "angry";
        if (emotion === "fear") return "fear";
        if (emotion === "neutral") return "idle";
      }
      
      return "idle"; // Default if no emotion found
    };

    setCurrentEmotion(getEmotionFromScanner());
    
    // Listen for storage changes (in case emotion is updated in another tab/component)
    const handleStorageChange = () => {
      setCurrentEmotion(getEmotionFromScanner());
    };
    
    window.addEventListener("storage", handleStorageChange);
    // Also check periodically in case emotion is updated in same tab
    const interval = setInterval(() => {
      setCurrentEmotion(getEmotionFromScanner());
    }, 1000);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleSave = () => {
    // Save note with current emotion
    const today = new Date().toDateString();
    if (note) {
      localStorage.setItem(`mood_note_${today}`, note);
      localStorage.setItem(`mood_emotion_${today}`, currentEmotion);
    }
    console.log("Saving mood note:", note, "Emotion:", currentEmotion);
    setNote("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card className="w-full" data-testid="card-mood-logger">
        <CardHeader>
          <CardTitle className="font-accent text-2xl">How are you feeling today?</CardTitle>
          <CardDescription>Track your daily mood to better understand your emotional patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 3D Emotion Model Animation */}
          <div className="w-full" key={currentEmotion}>
            <EmotionModelViewer emotion={currentEmotion} />
          </div>
          
          {currentEmotion === "idle" && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                No mood analyzed yet. Please use the Mood Scanner to analyze your emotion.
              </p>
            </div>
          )}
          
          {currentEmotion !== "idle" && (
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <p className="text-sm font-medium">
                Current Emotion: <span className="text-primary capitalize">{currentEmotion}</span>
              </p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Add a note (optional)</label>
            <Textarea
              placeholder="What's on your mind? How are you feeling today?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-24 resize-none"
              data-testid="input-mood-note"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={!note.trim()}
            className="w-full"
            data-testid="button-save-mood"
          >
            Save Note
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
