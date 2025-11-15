import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { MandalaGenerator } from "@/components/MandalaGenerator";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home, Flower2 } from "lucide-react";
import { motion } from "framer-motion";

export default function MandalaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 dark:from-[#0e0e10] dark:via-[#171725] dark:to-[#202032] transition-all duration-700">
      <Header />

      <main className="container mx-auto pt-28 pb-20 px-6 text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <h1 className="flex justify-center items-center gap-3 text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            <Flower2 className="h-10 w-10" /> Mandala Generator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Relax with symmetry—every stroke repeats around a center, forming meditative art.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative max-w-6xl mx-auto border border-white/30 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          bg-gradient-to-br from-white/70 via-white/40 to-white/20 dark:from-gray-900/70 dark:via-gray-800/60
          dark:to-gray-900/40 backdrop-blur-2xl overflow-hidden"
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 4, -4, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="absolute top-5 right-8 text-3xl opacity-70 select-none"
          >
            🌸
          </motion.div>

          <div className="p-6 md:p-10">
            <MandalaGenerator />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mt-10"
        >
          <Link href="/creative-tools">
            <Button
              variant="outline"
              className="rounded-full px-6 py-3 text-lg font-semibold border-2 border-purple-400/40 text-purple-700
              dark:text-purple-300 hover:bg-purple-100/30 dark:hover:bg-purple-900/30 hover:scale-105 hover:border-purple-500
              transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Home className="h-5 w-5" /> Back to Creative Tools
            </Button>
          </Link>
        </motion.div>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
