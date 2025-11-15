import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PeacePong: React.FC = () => {
  const [ball, setBall] = useState({ x: 50, y: 50, dx: 1, dy: 1 });
  const [player, setPlayer] = useState(50);
  const [ai, setAi] = useState(50);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/sounds/PeacePong.mp3");
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

  useEffect(() => {
    const interval = setInterval(() => {
      setBall((b) => {
        let { x, y, dx, dy } = b;
        x += dx * 1.5;
        y += dy * 1.5;
        if (y <= 0 || y >= 100) dy = -dy;
        if (x <= 5 && Math.abs(y - player) < 15) dx = -dx;
        if (x >= 95 && Math.abs(y - ai) < 15) dx = -dx;
        return { x, y, dx, dy };
      });
      setAi((a) => a + (ball.y - a) * 0.05);
    }, 30);
    return () => clearInterval(interval);
  }, [player, ai]);

  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-br from-indigo-100 via-background to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[400px]">
      <Card className="border-2 shadow-lg max-w-2xl w-full bg-card/70 backdrop-blur-xl">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-4xl font-accent text-indigo-600 flex items-center justify-center gap-2">
            🏓 Peace Pong
          </CardTitle>
          <p className="text-muted-foreground">Classic pong with soft visuals and chill ambient sound</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className="relative w-full max-w-[500px] h-[300px] bg-card border-2 rounded-xl overflow-hidden mx-auto"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setPlayer(((e.clientY - rect.top) / rect.height) * 100);
            }}
          >
            <div
              className="absolute w-2 h-16 bg-primary rounded shadow-lg"
              style={{ left: "2%", top: `${player}%`, transform: "translateY(-50%)" }}
            />
            <div
              className="absolute w-2 h-16 bg-secondary rounded shadow-lg"
              style={{ right: "2%", top: `${ai}%`, transform: "translateY(-50%)" }}
            />
            <div
              className="absolute w-4 h-4 bg-foreground rounded-full shadow-lg"
              style={{ left: `${ball.x}%`, top: `${ball.y}%`, transform: "translate(-50%, -50%)" }}
            />
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
