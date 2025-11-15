import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const emojis = ["😊", "😢", "😡", "😴", "😍", "😊", "😢", "😡", "😴", "😍"];

export const MoodMatch: React.FC = () => {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/sounds/MoodMatch.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    
    if (!muted) {
      audio.play().catch((err) => {
        console.warn("Audio playback failed:", err);
      });
    }
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (muted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.warn("Audio playback failed:", err);
        });
      }
    }
  }, [muted]);

  const handleFlip = (i: number) => {
    if (flipped.length === 2 || matched.includes(i)) return;
    const newFlipped = [...flipped, i];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [a, b] = newFlipped;
      if (emojis[a] === emojis[b]) setMatched([...matched, a, b]);
      setTimeout(() => setFlipped([]), 800);
    }
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-br from-purple-100 via-background to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[400px]">
      <Card className="border-2 shadow-lg max-w-2xl w-full bg-card/70 backdrop-blur-xl">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-4xl font-accent text-purple-600 flex items-center justify-center gap-2">
            💖 Mood Match
          </CardTitle>
          <p className="text-muted-foreground">Match pairs of emotions to train emotional awareness</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-5 gap-4 justify-center">
            {emojis.map((emoji, i) => (
              <div
                key={i}
                onClick={() => handleFlip(i)}
                className="w-16 h-16 flex items-center justify-center bg-card border-2 rounded-xl shadow-lg cursor-pointer text-3xl hover:scale-105 transition-transform"
              >
                {flipped.includes(i) || matched.includes(i) ? emoji : "❓"}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              onClick={() => setMuted(!muted)}
              variant={muted ? "outline" : "default"}
              className="rounded-full"
            >
              {muted ? (
                <>
                  <VolumeX className="h-5 w-5 mr-2" /> Sound Off
                </>
              ) : (
                <>
                  <Volume2 className="h-5 w-5 mr-2" /> Sound On
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
