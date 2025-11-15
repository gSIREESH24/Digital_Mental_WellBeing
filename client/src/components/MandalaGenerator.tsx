import { useRef, useState, useEffect } from "react";

export function MandalaGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [segments, setSegments] = useState(12);
  const [color, setColor] = useState("#a78bfa");

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDraw = () => setIsDrawing(false);

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - canvas.width / 2;
    const y = e.clientY - rect.top - canvas.height / 2;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    for (let i = 0; i < segments; i++) {
      ctx.rotate((2 * Math.PI) / segments);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <div className="text-center space-y-4">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        className="border-2 rounded-full shadow-lg bg-white cursor-crosshair"
      />
      <div className="flex justify-center gap-4">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10 rounded-full border-2 cursor-pointer"
        />
        <input
          type="range"
          min="6"
          max="24"
          value={segments}
          onChange={(e) => setSegments(Number(e.target.value))}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Adjust symmetry and color to create your mandala 🌸
      </p>
    </div>
  );
}
