import { useRef, useState, useEffect } from "react";

export function KaleidoscopeDrawer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mirrors, setMirrors] = useState(10);
  const [speed, setSpeed] = useState(0.02);
  const [colorHue, setColorHue] = useState(250);
  const [shapeType, setShapeType] = useState<"flower" | "star" | "organic">("flower");
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [isRandomizing, setIsRandomizing] = useState(false);

  // 🎛 Mouse/Touch interactive tilt
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      let x: number, y: number;
      if (e instanceof TouchEvent) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }
      const { innerWidth, innerHeight } = window;
      const tx = ((x / innerWidth) - 0.5) * 2;
      const ty = ((y / innerHeight) - 0.5) * 2;
      setTiltX(tx);
      setTiltY(ty);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  // 🎨 Animation Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angle = 0;
    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const radius = Math.min(width, height) / 2;
      ctx.clearRect(0, 0, width, height);

      // Radial color background
      const bg = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, radius);
      bg.addColorStop(0, `hsl(${(colorHue + 30) % 360}, 80%, 95%)`);
      bg.addColorStop(1, `hsl(${(colorHue + 180) % 360}, 70%, 60%)`);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.97, 0, Math.PI * 2);
      ctx.clip();

      ctx.rotate(tiltX * 0.5);
      ctx.scale(1 + tiltY * 0.2, 1 - tiltY * 0.2);

      const size = radius * 0.75;
      for (let i = 0; i < mirrors; i++) {
        ctx.save();
        ctx.rotate((i * 2 * Math.PI) / mirrors);
        ctx.scale(1, i % 2 === 0 ? 1 : -1);
        drawShape(ctx, angle, size, colorHue, shapeType);
        ctx.restore();
      }

      ctx.restore();
      angle += speed;
      setColorHue((h) => (h + 0.25) % 360);
      requestAnimationFrame(render);
    };

    render();
  }, [mirrors, speed, shapeType, tiltX, tiltY, colorHue]);

  // 🌀 Dynamic Shape Generator
  function drawShape(
    ctx: CanvasRenderingContext2D,
    angle: number,
    size: number,
    hue: number,
    type: string
  ) {
    ctx.save();
    ctx.rotate(angle);

    const gradient = ctx.createLinearGradient(-size, -size, size, size);
    gradient.addColorStop(0, `hsl(${hue}, 90%, 65%)`);
    gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 90%, 75%)`);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const petals = 6 + Math.floor((Math.sin(angle * 0.5) + 1) * 4);
    const radius = size * (0.4 + 0.1 * Math.sin(angle * 2));

    switch (type) {
      case "flower":
        for (let i = 0; i < petals; i++) {
          const theta = (i / petals) * Math.PI * 2;
          ctx.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius);
        }
        break;
      case "star":
        for (let i = 0; i < petals * 2; i++) {
          const theta = (i / (petals * 2)) * Math.PI * 2;
          const r = i % 2 === 0 ? radius * 0.6 : radius;
          ctx.lineTo(Math.cos(theta) * r, Math.sin(theta) * r);
        }
        break;
      default:
        for (let i = 0; i < 100; i++) {
          const theta = (i / 100) * Math.PI * 2;
          const r = radius * (0.7 + 0.3 * Math.sin(angle + theta * 6));
          ctx.lineTo(Math.cos(theta) * r, Math.sin(theta) * r);
        }
        break;
    }

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  // 🎲 Randomize Button Logic
  const randomizePattern = () => {
    setIsRandomizing(true);
    setTimeout(() => {
      const shapes = ["flower", "star", "organic"] as const;
      setShapeType(shapes[Math.floor(Math.random() * shapes.length)]);
      setMirrors(6 + Math.floor(Math.random() * 14));
      setSpeed(0.01 + Math.random() * 0.05);
      setColorHue(Math.floor(Math.random() * 360));
      setIsRandomizing(false);
    }, 400);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-12 space-y-8">
      {/* Circular Canvas Frame */}
      <div className="relative w-[380px] h-[380px] md:w-[500px] md:h-[500px] rounded-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.4)] bg-black flex items-center justify-center transition-transform duration-700 hover:scale-[1.02]">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className={`rounded-full transition-all duration-700 ${
            isRandomizing ? "opacity-80 scale-95" : "opacity-100 scale-100"
          }`}
        />
        {/* Subtle glass overlay for depth */}
        <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-b from-white/10 to-transparent" />
      </div>

      {/* Minimal Control Bar */}
      <div className="flex flex-wrap justify-center gap-4">
        <select
          value={shapeType}
          onChange={(e) => setShapeType(e.target.value as "flower" | "star" | "organic")}
          className="px-3 py-2 rounded-xl bg-white/30 dark:bg-gray-800/50 border border-white/30 backdrop-blur-md text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-400 transition-all"
        >
          <option value="flower">Flower</option>
          <option value="star">Star</option>
          <option value="organic">Organic</option>
        </select>

        <button
          onClick={randomizePattern}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-purple-300/30 transition-all"
        >
          🎲 Randomize
        </button>
      </div>

      <p className="text-sm text-muted-foreground max-w-md px-6">
        🪞 Move your mouse or touch the screen — the kaleidoscope responds fluidly to motion, just like the Apple Watch’s mesmerizing face.
      </p>
    </div>
  );
}
