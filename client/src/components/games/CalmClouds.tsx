import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Cloud, Wind, Volume2, VolumeX, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CloudObj {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export const CalmClouds: React.FC = () => {
  const [clouds, setClouds] = useState<CloudObj[]>([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Tap on clouds and breathe easy ☁️");
  const [gameActive, setGameActive] = useState(true);
  const [muted, setMuted] = useState(false);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  /** 🌬️ Initialize Calm Clouds */
  const spawnClouds = () => {
    const newClouds: CloudObj[] = Array.from({ length: 7 }, (_, i) => ({
      id: i,
      x: Math.random() * 80,
      y: Math.random() * 50,
      size: 80 + Math.random() * 80,
      speed: 0.3 + Math.random() * 0.5,
      opacity: 0.85 + Math.random() * 0.15,
    }));
    setClouds(newClouds);
    setScore(0);
    setMessage("Tap clouds to clear your mind 🌥️");
    setGameActive(true);
  };

  useEffect(() => {
    spawnClouds();
  }, []);

  /** ☁️ Animate clouds drifting */
  useEffect(() => {
    if (!gameActive) return;
    const interval = setInterval(() => {
      setClouds((prev) =>
        prev.map((c) => {
          const newX = c.x + c.speed;
          return newX > 110 ? { ...c, x: -25 } : { ...c, x: newX };
        })
      );
    }, 80);
    return () => clearInterval(interval);
  }, [gameActive]);

  /** 🌬️ Pop a cloud */
  const popCloud = (id: number) => {
    if (!gameActive) return;
    setClouds((prev) =>
      prev.map((c) => (c.id === id ? { ...c, opacity: 0 } : c))
    );
    setTimeout(() => {
      setClouds((prev) => prev.filter((c) => c.id !== id));
    }, 500);

    setScore((s) => s + 1);
    setMessage("Nice! Feel the calm breeze 🌿");

    if (clouds.length === 1) {
      setMessage("☁️ All clouds cleared — take a deep breath 🌸");
      setGameActive(false);
      setTimeout(() => {
        spawnClouds();
      }, 4000);
    }
  };

  /** 🎵 Background Music */
  useEffect(() => {
    const audio = new Audio("/sounds/calmclouds.mp3"); // place in public/sounds
    audio.loop = true;
    audio.volume = 0.3;
    musicRef.current = audio;
    if (!muted) audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [muted]);

  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-br from-sky-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen overflow-hidden relative">
      {/* ✨ Ambient Glow Orbs */}
      <div className="absolute w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl -top-40 -left-20 animate-float-slow"></div>
      <div className="absolute w-[400px] h-[400px] bg-cyan-200/30 rounded-full blur-3xl bottom-0 right-0 animate-float-slower"></div>

      <Card className="border-2 shadow-xl max-w-3xl w-full bg-card/70 backdrop-blur-xl animate-fade-in-up">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-4xl font-accent text-sky-600 flex items-center justify-center gap-2">
            <Cloud className="h-8 w-8 text-primary" />
            Calm Clouds
          </CardTitle>
          <p className="text-muted-foreground font-medium">{message}</p>
          <div className="flex justify-center gap-6 text-primary font-semibold">
            <span>☁️ Clouds Left: {clouds.length}</span>
            <span>✨ Relax Points: {score}</span>
          </div>

          {/* 🎵 Music Toggle */}
          <div className="flex justify-center mt-2">
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full hover:bg-primary/10"
              onClick={() => setMuted(!muted)}
            >
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="relative w-full h-[420px] overflow-hidden rounded-3xl bg-gradient-to-b from-sky-100/70 via-sky-50 to-sky-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          {/* ☁️ Clouds floating */}
          {clouds.map((cloud) => (
            <div
              key={cloud.id}
              onClick={() => popCloud(cloud.id)}
              className="absolute transition-all duration-500 ease-out cursor-pointer hover:scale-110"
              style={{
                left: `${cloud.x}%`,
                top: `${cloud.y}%`,
                width: `${cloud.size}px`,
                height: `${cloud.size * 0.6}px`,
                background:
                  "radial-gradient(circle at 40% 40%, white 60%, rgba(255,255,255,0.8))",
                borderRadius: "50%",
                opacity: cloud.opacity,
                filter: "drop-shadow(0 4px 10px rgba(255,255,255,0.7))",
              }}
            />
          ))}

          {/* 🌬️ Wind particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/60 rounded-full animate-breeze"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  animationDuration: `${5 + Math.random() * 3}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          {/* 🌞 End state overlay */}
          {!gameActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md rounded-2xl animate-fade-in">
              <Sun className="h-10 w-10 text-yellow-400 mb-3 animate-pulse" />
              <h3 className="text-2xl font-semibold text-sky-700 mb-3">
                ☁️ Session Complete!
              </h3>
              <p className="text-muted-foreground mb-5">
                You cleared the clouds and calmed your thoughts 🌿
              </p>
              <Button
                onClick={spawnClouds}
                className="flex items-center gap-2 rounded-full px-6 py-3 text-base hover:scale-105 transition-all"
              >
                <RefreshCw className="h-5 w-5" />
                Start Again
              </Button>
            </div>
          )}
        </CardContent>

        <div className="flex justify-center py-4">
          <Button
            onClick={spawnClouds}
            variant="outline"
            className="flex items-center gap-2 hover:scale-105 transition-all"
          >
            <Wind className="h-5 w-5" /> Reset Clouds
          </Button>
        </div>
      </Card>

      {/* ✨ Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(25px) translateX(20px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(-20px); }
        }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 16s ease-in-out infinite; }

        @keyframes breeze {
          0% { transform: translateY(0) translateX(0); opacity: 0.8; }
          100% { transform: translateY(-100vh) translateX(20vw); opacity: 0; }
        }
        .animate-breeze { animation: breeze linear infinite; }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 1s ease-in-out; }
      `}</style>
    </div>
  );
};
