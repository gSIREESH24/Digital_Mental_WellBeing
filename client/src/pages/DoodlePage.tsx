import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DoodlePad } from "@/components/DoodlePad";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Palette } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function DoodlePage() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Nunito:wght@400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 dark:from-[#0e0e10] dark:via-[#151522] dark:to-[#202032] transition-all duration-700">
      <Header />

      {/* Push content further down below header */}
      <main className="pt-32 pb-20 container mx-auto px-4 flex flex-col items-center">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <div className="flex justify-center mb-3">
            <Palette className="h-10 w-10 text-purple-500 dark:text-purple-400 animate-pulse" />
          </div>
          <h1
            className="font-bold text-5xl sm:text-6xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-sm"
            style={{
              fontFamily: "'Caveat', cursive",
              letterSpacing: "1.2px",
            }}
          >
            🎨 Doodle Pad
          </h1>
          <p
            className="mt-2 text-muted-foreground text-lg font-[Nunito]"
            style={{ fontWeight: 500 }}
          >
            A creative space for your imagination to flow freely.
          </p>
        </motion.div>

        {/* Centered Buttons in One Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center flex-wrap gap-5 mb-12"
        >
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 border-2 border-purple-300/50 rounded-xl 
              text-purple-700 dark:text-purple-300 hover:border-purple-500 
              hover:bg-purple-100/40 dark:hover:bg-purple-900/30 hover:scale-105 
              transition-all duration-300 font-semibold shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="h-5 w-5" /> Back to Creative Tools
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 border-2 border-purple-300/50 rounded-xl 
              text-purple-700 dark:text-purple-300 hover:border-purple-500 
              hover:bg-purple-100/40 dark:hover:bg-purple-900/30 hover:scale-105 
              transition-all duration-300 font-semibold shadow-sm hover:shadow-md"
            >
              <Home className="h-5 w-5" /> Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* DoodlePad Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-5xl rounded-3xl border border-white/20 shadow-[0_15px_45px_rgba(0,0,0,0.1)] p-8 
          bg-gradient-to-br from-white/80 via-white/60 to-white/30 dark:from-gray-900/70 dark:via-gray-800/60 
          dark:to-gray-900/50 backdrop-blur-xl hover:shadow-[0_20px_60px_rgba(128,90,213,0.15)] transition-all duration-700"
        >
          {/* Floating brush emoji */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 6, -6, 0] }}
            transition={{ repeat: Infinity, duration: 7 }}
            className="absolute top-6 right-8 text-4xl opacity-80 select-none"
          >
            🖌️
          </motion.div>

          <div className="flex flex-col items-center justify-center">
            <DoodlePad />
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
