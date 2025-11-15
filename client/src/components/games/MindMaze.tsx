import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  Flag,
  Smile,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Brain,
  Gauge,
  Lightbulb,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Cell {
  row: number;
  col: number;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  visited: boolean;
  hint?: boolean;
}

const GRID_SIZE = 6;

export const MindMaze: React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
  const [message, setMessage] = useState("Select difficulty and find your way 🎯");
  const [steps, setSteps] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [flashGoal, setFlashGoal] = useState(false);
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [showHint, setShowHint] = useState(false);
  const [muted, setMuted] = useState(false);
  const [inactiveTime, setInactiveTime] = useState(0);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  /** 🔎 Check if maze is solvable (DFS) and return path */
  const findPath = (grid: Cell[][]): [number, number][] | null => {
    const visited = new Set<string>();
    const stack: { r: number; c: number; path: [number, number][] }[] = [
      { r: 0, c: 0, path: [[0, 0]] },
    ];

    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    while (stack.length) {
      const { r, c, path } = stack.pop()!;
      if (r === GRID_SIZE - 1 && c === GRID_SIZE - 1) return path;
      if (r < 0 || c < 0 || r >= GRID_SIZE || c >= GRID_SIZE) continue;
      const cell = grid[r][c];
      if (cell.isWall || visited.has(`${r}-${c}`)) continue;
      visited.add(`${r}-${c}`);
      for (const [dr, dc] of directions) {
        stack.push({ r: r + dr, c: c + dc, path: [...path, [r + dr, c + dc]] });
      }
    }
    return null;
  };

  const isSolvable = (grid: Cell[][]) => findPath(grid) !== null;

  /** 🔁 Generate solvable grid */
  const generateGrid = () => {
    const wallDensity =
      difficulty === "Easy" ? 0.1 : difficulty === "Medium" ? 0.2 : 0.3;

    let newGrid: Cell[][] = [];
    let pathFound: [number, number][] | null = null;
    let attempts = 0;

    while (!pathFound && attempts < 50) {
      attempts++;
      const tempGrid: Cell[][] = [];
      for (let r = 0; r < GRID_SIZE; r++) {
        const row: Cell[] = [];
        for (let c = 0; c < GRID_SIZE; c++) {
          const isWall =
            Math.random() < wallDensity &&
            !(r === 0 && c === 0) &&
            !(r === GRID_SIZE - 1 && c === GRID_SIZE - 1);
          row.push({
            row: r,
            col: c,
            isWall,
            isStart: r === 0 && c === 0,
            isEnd: r === GRID_SIZE - 1 && c === GRID_SIZE - 1,
            visited: false,
          });
        }
        tempGrid.push(row);
      }

      pathFound = findPath(tempGrid);
      if (pathFound) newGrid = tempGrid;
    }

    setGrid(newGrid);
    setPlayerPos({ row: 0, col: 0 });
    setSteps(0);
    setGameWon(false);
    setFlashGoal(false);
    setShowHint(false);
    setInactiveTime(0);
    setMessage(`Navigate the ${difficulty} maze 🧠`);
  };

  useEffect(() => {
    generateGrid();
  }, [difficulty]);

  /** 🧭 Move player */
  const movePlayer = (direction: "up" | "down" | "left" | "right") => {
    if (gameWon) return;

    let { row, col } = playerPos;
    if (direction === "up" && row > 0) row--;
    if (direction === "down" && row < GRID_SIZE - 1) row++;
    if (direction === "left" && col > 0) col--;
    if (direction === "right" && col < GRID_SIZE - 1) col++;

    const targetCell = grid[row][col];
    if (targetCell.isWall) {
      setMessage("Oops! A wall. Try another way 🧱");
      return;
    }

    setPlayerPos({ row, col });
    setSteps((s) => s + 1);
    setInactiveTime(0);
    setGrid((prev) =>
      prev.map((r) =>
        r.map((cell) =>
          cell.row === row && cell.col === col
            ? { ...cell, visited: true }
            : cell
        )
      )
    );

    if (targetCell.isEnd) {
      setMessage(`🎉 You conquered the ${difficulty} maze! Focus master 🌟`);
      setGameWon(true);
      setFlashGoal(true);
      setTimeout(() => {
        setFlashGoal(false);
        generateGrid();
      }, 3000);
    } else {
      const encouragements = [
        "Keep going... trust your path 🌿",
        "Stay calm, one step at a time 🧘",
        "Focus sharp, keep moving ✨",
        "Balance and direction matter 🌸",
      ];
      setMessage(encouragements[Math.floor(Math.random() * encouragements.length)]);
    }
  };

  /** 🎮 Keyboard Controls */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") movePlayer("up");
      if (e.key === "ArrowDown") movePlayer("down");
      if (e.key === "ArrowLeft") movePlayer("left");
      if (e.key === "ArrowRight") movePlayer("right");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  /** 🧘‍♀️ Auto-hint after inactivity */
  useEffect(() => {
    const interval = setInterval(() => {
      setInactiveTime((t) => {
        if (t >= 10 && !showHint && !gameWon) {
          const path = findPath(grid);
          if (path) {
            setShowHint(true);
            setGrid((g) =>
              g.map((row) =>
                row.map((cell) => {
                  const inPath = path.some(([r, c]) => r === cell.row && c === cell.col);
                  return { ...cell, hint: inPath && !cell.isStart && !cell.isEnd };
                })
              )
            );
            setMessage("💡 Hint revealed — follow the glowing path!");
          }
        }
        return t + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showHint, grid, gameWon]);

  /** 🎵 Music Setup */
  useEffect(() => {
    const audio = new Audio("/sounds/mindmaze.mp3");
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
    <div className="flex flex-col items-center py-10 bg-gradient-to-br from-primary/10 via-background to-secondary/20 min-h-screen">
      <Card className="border-2 shadow-xl max-w-3xl w-full bg-card/60 backdrop-blur-lg animate-fade-in-up">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-4xl font-accent text-primary flex items-center justify-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            Mind Maze
          </CardTitle>
          <p className="text-muted-foreground font-medium transition-all">{message}</p>
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-primary font-semibold">Steps:</span>
              <span className="text-foreground">{steps}</span>
            </div>
            {gameWon && (
              <span className="text-green-600 font-bold animate-pulse">
                ✅ Completed!
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-8">
          {/* 🎚️ Difficulty Selector + Sound */}
          <div className="flex flex-wrap justify-center gap-3 mb-2">
            {["Easy", "Medium", "Hard"].map((lvl) => (
              <Button
                key={lvl}
                size="sm"
                variant={difficulty === lvl ? "default" : "outline"}
                className={`rounded-full px-5 py-2 text-sm transition-all ${
                  difficulty === lvl
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
                onClick={() => setDifficulty(lvl as any)}
              >
                <Gauge className="h-4 w-4 mr-1" />
                {lvl}
              </Button>
            ))}

            <Button
              size="sm"
              variant="ghost"
              className="rounded-full hover:bg-primary/10"
              onClick={() => setMuted(!muted)}
            >
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
          </div>

          {/* 🧠 Maze Grid */}
          <div
            className="grid gap-2 p-6 rounded-3xl border bg-gradient-to-br from-secondary/30 via-background to-secondary/40 shadow-inner transition-all"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, 60px)`,
            }}
          >
            {grid.map((row, rIdx) =>
              row.map((cell) => {
                const isPlayer =
                  playerPos.row === cell.row && playerPos.col === cell.col;
                const baseClasses =
                  "w-[55px] h-[55px] rounded-xl flex items-center justify-center text-lg transition-all duration-300";
                const color = cell.isWall
                  ? "bg-gradient-to-br from-gray-400 to-gray-500 shadow-inner"
                  : cell.isEnd
                  ? flashGoal
                    ? "bg-gradient-to-br from-green-400 to-emerald-600 animate-glow"
                    : "bg-gradient-to-br from-green-400 to-emerald-500"
                  : cell.isStart
                  ? "bg-gradient-to-br from-blue-400 to-sky-500"
                  : cell.hint
                  ? "bg-gradient-to-br from-yellow-200 to-amber-400 animate-glow"
                  : cell.visited
                  ? "bg-gradient-to-br from-primary/20 to-primary/10"
                  : "bg-white";

                return (
                  <div
                    key={`${rIdx}-${cell.col}`}
                    className={`${baseClasses} ${color} hover:scale-105`}
                    style={{
                      boxShadow: isPlayer
                        ? "0 0 10px 3px rgba(99,102,241,0.6)"
                        : "",
                      transform: isPlayer ? "scale(1.05)" : undefined,
                    }}
                  >
                    {isPlayer && <Smile className="text-primary h-6 w-6" />}
                    {cell.isEnd && <Flag className="text-white h-5 w-5" />}
                  </div>
                );
              })
            )}
          </div>

          {/* 🎮 Controls */}
          <div className="flex flex-col items-center gap-3">
            <Button onClick={() => movePlayer("up")} size="icon" className="rounded-full h-12 w-12 shadow-md hover:scale-110 transition-all">
              <ArrowUp className="h-5 w-5" />
            </Button>
            <div className="flex gap-4">
              <Button onClick={() => movePlayer("left")} size="icon" className="rounded-full h-12 w-12 shadow-md hover:scale-110 transition-all">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button onClick={() => movePlayer("down")} size="icon" className="rounded-full h-12 w-12 shadow-md hover:scale-110 transition-all">
                <ArrowDown className="h-5 w-5" />
              </Button>
              <Button onClick={() => movePlayer("right")} size="icon" className="rounded-full h-12 w-12 shadow-md hover:scale-110 transition-all">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* 🔁 New Maze Button */}
          <Button
            onClick={generateGrid}
            className="mt-4 flex items-center gap-2 rounded-full px-6 py-3 text-base hover:scale-105 transition-all"
          >
            <RefreshCw className="h-5 w-5" />
            New Maze
          </Button>
        </CardContent>
      </Card>

      {/* ✨ Animations */}
      <style>{`
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 15px 6px rgba(16,185,129,0.6); }
          50% { box-shadow: 0 0 30px 10px rgba(16,185,129,0.9); }
        }
        .animate-glow { animation: glow 1.5s ease-in-out infinite; }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
      `}</style>
    </div>
  );
};
