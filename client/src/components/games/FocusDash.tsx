import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap,
  RefreshCw,
  Smile,
  Volume2,
  VolumeX,
  Wind,
} from "lucide-react";

interface Obstacle {
  id: number;
  x: number;
  y: number;
  speed: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  driftX: number;
  driftY: number;
}

export const FocusDash: React.FC = () => {
  const [playerPos, setPlayerPos] = useState(45);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [message, setMessage] = useState("🧘 Stay focused, avoid distractions, and flow.");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dingRef = useRef<HTMLAudioElement | null>(null);
  const loseRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  /** 🎵 Setup background and sound effects */
  useEffect(() => {
    const audio = new Audio("/sounds/focusdash.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    const ding = new Audio("/sounds/focus-ding.mp3");
    ding.volume = 0.5;
    dingRef.current = ding;

    const lose = new Audio("/sounds/focus-lose.mp3");
    lose.volume = 0.6;
    loseRef.current = lose;

    if (musicOn) audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (musicOn) audioRef.current.play().catch(() => {});
      else audioRef.current.pause();
    }
  }, [musicOn]);

  /** 🎮 Movement controls */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      if (e.key === "ArrowLeft") setPlayerPos((p) => Math.max(0, p - 6));
      if (e.key === "ArrowRight") setPlayerPos((p) => Math.min(90, p + 6));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver]);

  /** ⚡ Generate falling distractions */
  useEffect(() => {
    if (gameOver) return;
    const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"];
    const interval = setInterval(() => {
      setObstacles((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 90,
          y: 0,
          speed: 1 + Math.random() * 1.8,
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      ]);
    }, 850);
    return () => clearInterval(interval);
  }, [gameOver]);

  /** 🎯 Animate obstacles */
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setObstacles((prev) =>
        prev
          .map((o) => ({ ...o, y: o.y + o.speed }))
          .filter((o) => o.y < 100)
      );

      setScore((s) => s + 1);
      setStreak((st) => st + 1);

      if (score > 0 && score % 150 === 0 && dingRef.current) {
        dingRef.current.currentTime = 0;
        dingRef.current.play().catch(() => {});
        setMessage("💫 Your focus is glowing — keep steady!");
      } else if (score > 500) {
        setMessage("🔥 You’re in flow state! Total calm and precision.");
      }
    }, 60);
    return () => clearInterval(interval);
  }, [score, gameOver]);

  /** 💥 Collision detection */
  useEffect(() => {
    obstacles.forEach((o) => {
      if (Math.abs(o.x - playerPos) < 7 && o.y > 80 && o.y < 95) {
        setGameOver(true);
        setMessage("😵 You lost focus! Breathe and try again.");
        if (loseRef.current) {
          loseRef.current.currentTime = 0;
          loseRef.current.play().catch(() => {});
        }
        setTimeout(() => resetGame(), 3500);
      }
    });
  }, [obstacles, playerPos]);

  /** 🌬️ Floating light particles */
  useEffect(() => {
    const numParticles = 40;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = (canvas.width = 600);
    const h = (canvas.height = 400);

    const createParticles = (): Particle[] =>
      Array.from({ length: numParticles }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        driftX: (Math.random() - 0.5) * 0.2,
        driftY: (Math.random() - 0.5) * 0.3,
      }));

    setParticles(createParticles());

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 100, ${p.opacity})`;
        ctx.fill();
        p.x += p.driftX;
        p.y += p.driftY;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, [particles]);

  /** 🔁 Reset */
  const resetGame = () => {
    setPlayerPos(45);
    setObstacles([]);
    setScore(0);
    setStreak(0);
    setGameOver(false);
    setMessage("🧘‍♀️ Stay focused and avoid distractions.");
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-br from-yellow-100 via-white to-orange-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen relative overflow-hidden">
      {/* ✨ Ambient orbs */}
      <div className="absolute w-[500px] h-[500px] bg-yellow-200/30 rounded-full blur-3xl -top-40 -left-40 animate-float-slow"></div>
      <div className="absolute w-[400px] h-[400px] bg-orange-200/30 rounded-full blur-3xl bottom-0 right-0 animate-float-slower"></div>

      <Card className="border-2 shadow-xl max-w-3xl w-full bg-card/70 backdrop-blur-xl animate-fade-in-up">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-4xl font-accent text-amber-600 flex items-center justify-center gap-2">
            <Zap className="h-8 w-8 text-primary" />
            Focus Dash
          </CardTitle>
          <p className="text-muted-foreground font-medium">{message}</p>
          <div className="flex justify-center gap-8 text-primary font-semibold">
            <span>⚡ Score: {score}</span>
            <span>🎯 Streak: {streak}</span>
          </div>
        </CardHeader>

        {/* 🎮 Game Arena */}
        <CardContent className="relative w-full h-[420px] overflow-hidden rounded-2xl border bg-gradient-to-b from-yellow-50 via-white to-orange-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-inner">
          {/* 🌬️ Floating light particles */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-70"
          />

          {/* Falling distractions */}
          {obstacles.map((o) => (
            <div
              key={o.id}
              className="absolute rounded-full transition-transform animate-fall shadow-lg"
              style={{
                left: `${o.x}%`,
                top: `${o.y}%`,
                width: "35px",
                height: "35px",
                background: `radial-gradient(circle, ${o.color} 50%, rgba(0,0,0,0.1) 100%)`,
                boxShadow: `0 0 12px ${o.color}`,
                opacity: 0.9,
              }}
            />
          ))}

          {/* Player */}
          <div
            className="absolute bottom-4 transition-all duration-150"
            style={{
              left: `${playerPos}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="relative h-14 w-14 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-amber-500 shadow-lg">
              <Smile className="text-white h-6 w-6" />
              <div className="absolute inset-0 rounded-full animate-ping bg-primary/30" />
            </div>
          </div>

          {/* Game Over */}
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl animate-fade-in">
              <h3 className="text-3xl font-semibold text-red-600 mb-3">Focus Lost 😔</h3>
              <p className="text-muted-foreground mb-5 text-center max-w-md">
                Even the calmest minds drift — take a deep breath and restart your flow 🌿
              </p>
              <Button
                onClick={resetGame}
                className="flex items-center gap-2 rounded-full px-6 py-3 text-base hover:scale-105 transition-all"
              >
                <RefreshCw className="h-5 w-5" /> Try Again
              </Button>
            </div>
          )}
        </CardContent>

        {/* Controls */}
        <div className="flex justify-center py-4 gap-4">
          <Button
            onClick={resetGame}
            variant="outline"
            className="flex items-center gap-2 hover:scale-105 transition-all"
          >
            <RefreshCw className="h-5 w-5" /> Reset
          </Button>
          <Button
            variant={musicOn ? "default" : "outline"}
            onClick={() => setMusicOn(!musicOn)}
            className="flex items-center gap-2 hover:scale-105 transition-all"
          >
            {musicOn ? (
              <>
                <Volume2 className="h-5 w-5" /> Music On
              </>
            ) : (
              <>
                <VolumeX className="h-5 w-5" /> Music Off
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* ✨ Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(20px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(-20px); }
        }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 14s ease-in-out infinite; }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 1s ease-in-out; }

        @keyframes fall {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        .animate-fall { animation: fall 0.5s ease-in-out; }
      `}</style>
    </div>
  );
};
