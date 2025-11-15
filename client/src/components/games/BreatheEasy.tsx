import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Volume2, VolumeX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const BreatheEasy: React.FC = () => {
  const [phase, setPhase] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");
  const [counter, setCounter] = useState(4);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/sounds/breathe.mp3");
    audio.loop = true;
    audio.volume = 0.4;
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((c) => {
        if (c === 1) {
          setPhase((p) =>
            p === "Inhale"
              ? "Hold"
              : p === "Hold"
              ? "Exhale"
              : "Inhale"
          );
          return 4;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 min-h-[400px]">
      <Card className="border-2 shadow-lg bg-card/70 backdrop-blur-md p-8 text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-accent text-sky-600">
            🌬️ Breathe Easy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl mb-6 text-muted-foreground">
            {phase === "Inhale"
              ? "Breathe in deeply..."
              : phase === "Hold"
              ? "Hold your breath..."
              : "Exhale slowly..."}
          </div>
          <div className="relative h-48 w-48 mx-auto flex items-center justify-center">
            <div
              className={`rounded-full bg-gradient-to-br from-sky-300 to-sky-500 shadow-lg transition-all duration-1000 ${
                phase === "Inhale"
                  ? "w-44 h-44"
                  : phase === "Hold"
                  ? "w-36 h-36"
                  : "w-24 h-24"
              }`}
            />
          </div>
          <p className="text-lg mt-6 text-muted-foreground font-semibold text-2xl">{counter}</p>
          <div className="flex gap-3 justify-center mt-6">
            <Button
              onClick={() => {
                setPhase("Inhale");
                setCounter(4);
              }}
              variant="outline"
              className="rounded-full"
            >
              <RefreshCw className="h-5 w-5 mr-2" /> Restart
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
