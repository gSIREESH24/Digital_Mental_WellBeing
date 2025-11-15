import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmotionModelViewer } from "./EmotionModelViewer";
import { Smile, Frown, Angry, Meh, AlertCircle, Zap } from "lucide-react";

type EmotionModelDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const emotionConfig = {
  happy: { label: "Happy", icon: Smile, color: "text-green-500" },
  sad: { label: "Sad", icon: Frown, color: "text-blue-500" },
  angry: { label: "Angry", icon: Angry, color: "text-red-500" },
  idle: { label: "Idle", icon: Meh, color: "text-yellow-500" },
  fear: { label: "Fear", icon: AlertCircle, color: "text-purple-500" },
  surprise: { label: "Surprise", icon: Zap, color: "text-orange-500" },
};

export function EmotionModelDialog({ open, onOpenChange }: EmotionModelDialogProps) {
  const [emotion, setEmotion] = useState<"happy" | "sad" | "angry" | "idle" | "fear" | "surprise">("idle");

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

    if (open) {
      // Get emotion from MoodScanner when dialog opens
      setEmotion(getEmotionFromScanner());
      
      // Check periodically for updates
      const interval = setInterval(() => {
        setEmotion(getEmotionFromScanner());
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [open]);

  const currentConfig = emotionConfig[emotion];
  const Icon = currentConfig.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Icon className={`h-6 w-6 ${currentConfig.color}`} />
            Emotion Model - {currentConfig.label}
          </DialogTitle>
          <DialogDescription>
            Your 3D emotion model based on today's mood. You can rotate, zoom, and pan the model.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <EmotionModelViewer emotion={emotion} />
          {emotion === "idle" && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                No mood analyzed yet. Please use the Mood Scanner to analyze your emotion.
              </p>
            </div>
          )}
          {emotion !== "idle" && (
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <p className="text-sm font-medium">
                Current Emotion: <span className="text-primary capitalize">{emotionConfig[emotion].label}</span>
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

