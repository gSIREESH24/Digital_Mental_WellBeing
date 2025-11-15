import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Focus, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export const FocusBlocks: React.FC = () => {
  const [blocks, setBlocks] = useState<number[]>([50]);
  const [currentX, setCurrentX] = useState(0);
  const [direction, setDirection] = useState(1);
  const [speed, setSpeed] = useState(2);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [perfectDrop, setPerfectDrop] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/sounds/FocusBlocks.mp3");
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

  // 🎮 Movement effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) return;
      setCurrentX((x) => {
        if (x > 50 || x < -50) setDirection((d) => -d);
        return x + direction * speed;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [direction, speed, gameOver]);

  // ⌨️ Spacebar support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && !gameOver) dropBlock();
      if (e.code === "KeyR" && gameOver) resetGame();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  // 🧱 Drop logic
  const dropBlock = useCallback(() => {
    setBlocks((prev) => {
      const diff = Math.abs(currentX - (prev[prev.length - 1] || 0));
      if (diff > 30) {
        setGameOver(true);
        return prev;
      }

      if (diff < 5) {
        // Perfect alignment reward
        setPerfectDrop(true);
        setTimeout(() => setPerfectDrop(false), 500);
      }

      setScore((s) => s + 10);
      setSpeed((sp) => Math.min(sp + 0.2, 6)); // Increase difficulty gradually
      return [...prev, currentX];
    });
  }, [currentX]);

  const resetGame = () => {
    setBlocks([50]);
    setGameOver(false);
    setCurrentX(0);
    setSpeed(2);
    setScore(0);
  };

  // 🌈 Color gradient for each block
  const getBlockColor = (index: number) => {
    const colors = [
      "from-indigo-400 to-indigo-600",
      "from-teal-400 to-emerald-600",
      "from-amber-400 to-orange-600",
      "from-pink-400 to-rose-600",
      "from-cyan-400 to-blue-600",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gradient-to-b from-indigo-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 min-h-[500px] transition-colors duration-700">
      <h2 className="text-4xl font-accent mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
        🧱 Focus Blocks
      </h2>

      <div className="text-muted-foreground mb-4">
        {gameOver ? "Game Over 😅" : "Press Space or Click Drop to Focus"}
      </div>

      <div className="relative w-80 h-[420px] border border-white/20 rounded-2xl overflow-hidden bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md shadow-2xl">
        {blocks.map((x, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-md bg-gradient-to-r ${getBlockColor(i)} shadow-lg`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              bottom: `${i * 28}px`,
              left: `calc(50% + ${x}px)`,
              width: "65px",
              height: "25px",
              transform: "translateX(-50%)",
            }}
          />
        ))}

        {!gameOver && (
          <motion.div
            className={`absolute rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 shadow-md ${
              perfectDrop ? "ring-4 ring-yellow-300" : ""
            }`}
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            style={{
              bottom: `${blocks.length * 28}px`,
              left: `calc(50% + ${currentX}px)`,
              width: "65px",
              height: "25px",
              transform: "translateX(-50%)",
            }}
          />
        )}

        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm text-white/90 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md shadow"
        >
          🎯 Score: {score}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex gap-4">
        <Button
          onClick={dropBlock}
          disabled={gameOver}
          className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition-all rounded-full"
        >
          <Focus className="h-5 w-5 mr-2" /> Drop
        </Button>

        <Button
          onClick={resetGame}
          variant="outline"
          className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all rounded-full"
        >
          <RefreshCw className="h-5 w-5 mr-2" /> Reset
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

      {gameOver && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-red-500 font-medium"
        >
          You lost focus 😅 — press “R” to restart
        </motion.p>
      )}
    </div>
  );
};
