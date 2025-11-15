import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

// 🧩 Existing Games
import { MindMaze } from "@/components/games/MindMaze";
import { BreatheEasy } from "@/components/games/BreatheEasy";
import { CalmClouds } from "@/components/games/CalmClouds";
import { FocusDash } from "@/components/games/FocusDash";
import { FocusBlocks } from "@/components/games/FocusBlocks";
import { ZenGarden } from "@/components/games/ZenGarden";
import { ColorFlow } from "@/components/games/ColorFlow";
import { MoodMatch } from "@/components/games/MoodMatch";
import { PeacePong } from "@/components/games/PeacePong";

// 🎮 Placeholder for upcoming titles
const ComingSoon = ({ name }: { name: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center text-center py-20 space-y-6"
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Gamepad2 className="h-12 w-12 text-muted-foreground" />
    </motion.div>
    <h2 className="text-3xl font-semibold tracking-wide text-foreground">
      🚧 {name} Coming Soon
    </h2>
    <p className="text-muted-foreground max-w-md leading-relaxed">
      This mindful experience is still in development. Stay tuned for a new way
      to relax, focus, and recharge 🌿
    </p>
  </motion.div>
);

export default function GamePage() {
  const [, params] = useRoute("/game/:name");
  const gameName = decodeURIComponent(params?.name || "");

  // 🧠 Render selected game
  const renderGame = (name: string) => {
    switch (name) {
      case "Mind Maze":
        return <MindMaze />;
      case "Calm Clouds":
        return <CalmClouds />;
      case "Focus Dash":
        return <FocusDash />;
      case "Breathe Easy":
        return <BreatheEasy />;
      case "Focus Blocks":
        return <FocusBlocks />;
      case "Zen Garden":
        return <ZenGarden />;
      case "Color Flow":
        return <ColorFlow />;
      case "Mood Match":
        return <MoodMatch />;
      case "Peace Pong":
        return <PeacePong />;

      // 🌟 New Games (Add them later in /components/games)
      case "Wave Sync":
      case "Echo Path":
      case "Aurora Trails":
      case "Memory Bloom":
      case "Pulse Drift":
      // Future or multiplayer titles
      case "RelaxRace":
      case "RelaxRace (Multiplayer)":
      case "Harmony Tiles":
      case "Harmony Tiles (Multiplayer)":
      case "Sound Journey":
      case "Happy Steps":
      case "Serenity Sprint":
      case "Echo Garden":
      case "Wave Calm":
      case "Memory Match":
      case "Trivia of Tranquility":
      case "Emoji Balance":
      case "MindLink":
        return <ComingSoon name={name} />;
      default:
        return <ComingSoon name={name || "This Game"} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* 🌤 Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/20"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <motion.h1
              className="font-accent text-4xl md:text-5xl lg:text-6xl font-bold"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              {gameName || "Game"} 🎮
            </motion.h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Focus your mind, relax your senses, and discover calm through play.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 🎮 Game Section */}
      <main className="container mx-auto px-4 py-10">
        <div className="flex justify-center mb-8">
          <Link href="/games">
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:scale-105 transition-transform rounded-full"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Games
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card/60 p-10 rounded-3xl shadow-xl backdrop-blur-md border border-border animate-fade-in-up"
        >
          {renderGame(gameName)}
        </motion.div>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
