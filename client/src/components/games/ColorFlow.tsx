import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const colors = ["#FFB6C1", "#ADD8E6", "#90EE90", "#FFD700", "#FFA07A"];

export const ColorFlow: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [pairs, setPairs] = useState<number[]>([]);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/sounds/ColorFlow.mp3");
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

  const clickTile = (i: number) => {
    if (pairs.includes(i)) return;
    if (selected === null) setSelected(i);
    else if (colors[i % colors.length] === colors[selected % colors.length]) {
      setPairs([...pairs, i, selected]);
      setSelected(null);
    } else {
      setSelected(null);
    }
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-br from-pink-100 via-background to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[400px]">
      <Card className="border-2 shadow-lg max-w-2xl w-full bg-card/70 backdrop-blur-xl">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-4xl font-accent text-pink-600 flex items-center justify-center gap-2">
            🎨 Color Flow
          </CardTitle>
          <p className="text-muted-foreground">Match colors to clear your mind</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-5 gap-4 justify-center">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                onClick={() => clickTile(i)}
                className={`w-16 h-16 rounded-xl cursor-pointer transition-all shadow-lg ${
                  pairs.includes(i)
                    ? "opacity-30"
                    : selected === i
                    ? "scale-110 ring-4 ring-primary"
                    : "hover:scale-105"
                }`}
                style={{ backgroundColor: colors[i % colors.length] }}
              />
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
