import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Flower2, RefreshCw, Volume2, VolumeX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ZenGarden: React.FC = () => {
  const [decorations, setDecorations] = useState<{ x: number; y: number }[]>([]);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/sounds/Peaceful_Music_for_Meditation.mp3");
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

  const addDecoration = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDecorations([
      ...decorations,
      { x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-br from-green-100 via-background to-emerald-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[400px]">
      <Card className="border-2 shadow-lg max-w-2xl w-full bg-card/70 backdrop-blur-xl">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-4xl font-accent text-green-600 flex items-center justify-center gap-2">
            <Flower2 className="h-8 w-8 text-primary" />
            Zen Garden
          </CardTitle>
          <p className="text-muted-foreground">Click anywhere to add decorations 🌸</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            onClick={addDecoration}
            className="relative w-full h-96 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 rounded-xl shadow-inner cursor-pointer overflow-hidden"
          >
            {decorations.map((d, i) => (
              <div
                key={i}
                className="absolute text-green-700 dark:text-green-300 text-2xl"
                style={{ left: d.x, top: d.y }}
              >
                🌸
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3">
            <Button
              onClick={() => setDecorations([])}
              variant="outline"
              className="rounded-full"
            >
              <RefreshCw className="h-5 w-5 mr-2" /> Reset Garden
            </Button>
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
