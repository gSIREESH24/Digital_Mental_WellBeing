import { useRef, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Eraser,
  Trash2,
  Download,
  Music,
  VolumeX,
  RotateCcw,
  RotateCw,
  Sparkles,
  PaintBucket,
  Wind,
  Palette,
  ChevronDown,
  Shapes,
  Shuffle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const defaultColors = [
  "#FF9A9E", "#FFB6C1", "#FFD6E0", "#FFE5B4", "#FFF7AE",
  "#B5EAD7", "#B7E4C7", "#A8D8EA", "#B4E1FF", "#A1C4FD",
  "#D6C1FF", "#C7B3E5", "#E6CFFF", "#F5E6D3", "#FDCB82",
];

const shapes = ["Free Draw", "Square", "Circle", "Triangle", "Line", "Star", "Heart"];

export function DoodlePad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [colors, setColors] = useState<string[]>(defaultColors);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [isEraser, setIsEraser] = useState(false);
  const [brushSize, setBrushSize] = useState(6);
  const [musicOn, setMusicOn] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [selectedShape, setSelectedShape] = useState("Free Draw");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [mirrorMode, setMirrorMode] = useState(false);
  const [sprayMode, setSprayMode] = useState(false);
  const [fillMode, setFillMode] = useState(false);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  // 🎵 Music
  useEffect(() => {
    if (musicOn) {
      const newAudio = new Audio("/sounds/doodle-music.mp3");
      newAudio.loop = true;
      newAudio.volume = 0.3;
      newAudio.play().catch(() => {});
      setAudio(newAudio);
    } else {
      audio?.pause();
      audio && (audio.currentTime = 0);
    }
    return () => {
      audio?.pause();
      audio && (audio.currentTime = 0);
    };
  }, [musicOn]);

  // 🧠 Canvas Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brushSize;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [brushSize, backgroundColor]);

  /** 🪣 Fill (Flood Fill) */
  const handleFill = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const startX = Math.floor(e.clientX - rect.left);
    const startY = Math.floor(e.clientY - rect.top);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const target = getColorAt(data, startX, startY, canvas.width);
    const fill = hexToRgba(currentColor);

    if (colorsMatch(target, fill)) return;

    const stack = [[startX, startY]];
    while (stack.length > 0) {
      const [x, y] = stack.pop()!;
      const idx = (y * canvas.width + x) * 4;
      const current = getColorAt(data, x, y, canvas.width);
      if (colorsMatch(current, target)) {
        setColorAt(data, idx, fill);
        if (x > 0) stack.push([x - 1, y]);
        if (x < canvas.width - 1) stack.push([x + 1, y]);
        if (y > 0) stack.push([x, y - 1]);
        if (y < canvas.height - 1) stack.push([x, y + 1]);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  };

  const getColorAt = (data: Uint8ClampedArray, x: number, y: number, width: number) => {
    const i = (y * width + x) * 4;
    return [data[i], data[i + 1], data[i + 2], data[i + 3]];
  };

  const setColorAt = (data: Uint8ClampedArray, i: number, color: number[]) => {
    data[i] = color[0];
    data[i + 1] = color[1];
    data[i + 2] = color[2];
    data[i + 3] = 255;
  };

  const hexToRgba = (hex: string) => {
    const c = hex.substring(1);
    const n = parseInt(c, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 255];
  };

  const colorsMatch = (a: number[], b: number[]) =>
    Math.abs(a[0] - b[0]) < 15 && Math.abs(a[1] - b[1]) < 15 && Math.abs(a[2] - b[2]) < 15;

  /** 🖌 Drawing */
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (fillMode) return handleFill(e);
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setUndoStack((p) => [...p.slice(-19), canvas.toDataURL()]);
    setRedoStack([]);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const drawShape = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    switch (selectedShape) {
      case "Square": ctx.rect(x - 25, y - 25, 50, 50); break;
      case "Circle": ctx.arc(x, y, 30, 0, Math.PI * 2); break;
      case "Triangle":
        ctx.moveTo(x, y - 30);
        ctx.lineTo(x - 25, y + 25);
        ctx.lineTo(x + 25, y + 25);
        ctx.closePath(); break;
      case "Line": ctx.moveTo(x - 25, y - 25); ctx.lineTo(x + 25, y + 25); break;
      case "Star": {
        const spikes = 5, outer = 25, inner = 10;
        let rot = (Math.PI / 2) * 3, step = Math.PI / spikes;
        ctx.moveTo(x, y - outer);
        for (let i = 0; i < spikes; i++) {
          ctx.lineTo(x + Math.cos(rot) * outer, y + Math.sin(rot) * outer);
          rot += step;
          ctx.lineTo(x + Math.cos(rot) * inner, y + Math.sin(rot) * inner);
          rot += step;
        }
        ctx.closePath(); break;
      }
      case "Heart":
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x - 25, y - 25, x - 40, y + 10, x, y + 40);
        ctx.bezierCurveTo(x + 40, y + 10, x + 25, y - 25, x, y);
        break;
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineWidth = isEraser ? 20 : brushSize;
    ctx.strokeStyle = isEraser ? backgroundColor : currentColor;
    ctx.fillStyle = currentColor;

    if (selectedShape === "Free Draw") {
      ctx.lineTo(x, y);
      ctx.stroke();
      if (mirrorMode) {
        ctx.beginPath();
        ctx.moveTo(canvas.width - x, y);
        ctx.lineTo(canvas.width - x - 1, y + 1);
        ctx.stroke();
      }
      if (sprayMode) {
        for (let i = 0; i < 10; i++) {
          const offsetX = Math.random() * brushSize * 2 - brushSize;
          const offsetY = Math.random() * brushSize * 2 - brushSize;
          ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
        }
      }
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const img = new Image();
      img.src = undoStack[undoStack.length - 1];
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        ctx.beginPath();
        drawShape(ctx, x, y);
        fillMode ? ctx.fill() : ctx.stroke();
      };
    }
  };

  const stopDrawing = () => setIsDrawing(false);
  const clearCanvas = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, c.width, c.height);
    setUndoStack([]); setRedoStack([]);
  };
  const saveCanvas = () => {
    const c = canvasRef.current;
    if (!c) return;
    const link = document.createElement("a");
    link.download = `doodle-${Date.now()}.png`;
    link.href = c.toDataURL();
    link.click();
  };
  const undo = () => {
    if (!undoStack.length) return;
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const last = undoStack.pop()!;
    setRedoStack((p) => [...p, c.toDataURL()]);
    const img = new Image();
    img.src = last; img.onload = () => ctx.drawImage(img, 0, 0);
  };
  const redo = () => {
    if (!redoStack.length) return;
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const next = redoStack.pop()!;
    setUndoStack((p) => [...p, c.toDataURL()]);
    const img = new Image();
    img.src = next; img.onload = () => ctx.drawImage(img, 0, 0);
  };
  const toggleTool = (tool: "eraser" | "mirror" | "spray" | "fill") => {
    setIsEraser(tool === "eraser" ? !isEraser : false);
    setMirrorMode(tool === "mirror" ? !mirrorMode : false);
    setSprayMode(tool === "spray" ? !sprayMode : false);
    setFillMode(tool === "fill" ? !fillMode : false);
  };
  const randomPalette = () => {
    const newColors = Array.from({ length: 15 }, () => {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 70%, ${70 + Math.random() * 10}%)`;
    });
    setColors(newColors); setCurrentColor(newColors[0]);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-background via-secondary/10 to-background backdrop-blur-lg shadow-xl border border-primary/20">
      <CardHeader>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 🎛 Toolbar */}
        <div className="flex flex-col gap-4 bg-secondary/30 p-4 rounded-xl shadow-inner">
          {/* 🎨 Colors in one scrollable line */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/40">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setCurrentColor(color);
                  setIsEraser(false);
                }}
                className={`w-10 h-10 rounded-full border-2 shadow-sm hover:scale-110 transition-all flex-shrink-0 ${
                  currentColor === color
                    ? "ring-2 ring-primary border-primary"
                    : "border-border"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
            <Button
              onClick={randomPalette}
              variant="outline"
              size="icon"
              title="Random Palette"
              className="ml-2 flex-shrink-0 hover:scale-105"
            >
              <Shuffle className="h-4 w-4 text-primary" />
            </Button>
          </div>

          {/* Tools */}
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Shapes className="h-4 w-4" /> {selectedShape}{" "}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {shapes.map((shape) => (
                  <DropdownMenuItem key={shape} onClick={() => setSelectedShape(shape)}>
                    {shape}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant={fillMode ? "default" : "outline"}
              size="icon"
              onClick={() => toggleTool("fill")}
              title="Fill Mode"
            >
              <PaintBucket className="h-4 w-4" />
            </Button>

            <Button
              variant={mirrorMode ? "default" : "outline"}
              size="icon"
              onClick={() => toggleTool("mirror")}
              title="Mirror Mode"
            >
              <Wind className="h-4 w-4" />
            </Button>

            <Button
              variant={sprayMode ? "default" : "outline"}
              size="icon"
              onClick={() => toggleTool("spray")}
              title="Spray Paint"
            >
              <Sparkles className="h-4 w-4" />
            </Button>

            <Button
              variant={isEraser ? "default" : "outline"}
              size="icon"
              onClick={() => toggleTool("eraser")}
              title="Eraser"
            >
              <Eraser className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" onClick={undo} title="Undo">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={redo} title="Redo">
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={clearCanvas} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={saveCanvas} title="Save">
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant={musicOn ? "default" : "outline"}
              size="icon"
              onClick={() => setMusicOn(!musicOn)}
              className={musicOn ? "animate-pulse shadow-md" : ""}
              title="Music"
            >
              {musicOn ? <Music className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* 🖼 Canvas */}
        <div
          className="relative border-2 rounded-2xl overflow-hidden shadow-lg bg-white"
          style={{ backgroundColor }}
        >
          <div
            className="absolute pointer-events-none rounded-full border border-primary/40"
            style={{
              top: cursorPos.y - brushSize / 2 - 80,
              left: cursorPos.x - brushSize / 2 - 40,
              width: brushSize,
              height: brushSize,
              transition: "all 0.05s ease-out",
            }}
          />
          <canvas
            ref={canvasRef}
            width={1100}
            height={650}
            className="w-full cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
