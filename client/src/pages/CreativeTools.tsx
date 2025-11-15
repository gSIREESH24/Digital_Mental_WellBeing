import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Flower2, Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function CreativeTools() {
  const tools = [
    {
      title: "Doodle Pad",
      desc: "Relax and unwind with freeform drawing, soothing music, and vibrant colors.",
      icon: <Palette className="h-8 w-8 text-primary" />,
      link: "/creative-tools/doodle",
      glow: "hover:shadow-primary/50",
    },
    {
      title: "Mandala Generator",
      desc: "Draw once, and see it repeat in perfect radial symmetry for meditative art.",
      icon: <Flower2 className="h-8 w-8 text-pink-500" />,
      link: "/creative-tools/mandala",
      glow: "hover:shadow-pink-400/50",
    },
    {
      title: "Kaleidoscope Drawer",
      desc: "Create mesmerizing reflections that flow with every motion.",
      icon: <Compass className="h-8 w-8 text-violet-500" />,
      link: "/creative-tools/kaleidoscope",
      glow: "hover:shadow-violet-400/50",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* 🌈 Hero Section */}
      <section className="relative w-full py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <Badge variant="secondary" className="mb-2">Creative Tools</Badge>
            <h1 className="font-accent text-4xl md:text-5xl lg:text-6xl font-bold">
              Explore. Create. Relax. 🎨
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover a set of mindful art tools to help you unwind and express your imagination.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 🎨 Tools Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={tool.link}>
                <Card
                  className="cursor-pointer group border-2 shadow-lg hover:shadow-xl bg-card/70 backdrop-blur-md rounded-2xl 
                            transform transition-all hover:scale-105 hover:border-primary/30"
                >
                  <CardHeader className="text-center">
                    <CardTitle className="flex justify-center items-center gap-2 font-accent text-2xl md:text-3xl">
                      {tool.icon}
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground text-base leading-relaxed">{tool.desc}</p>
                    <Button
                      size="lg"
                      variant="default"
                      className="rounded-full text-lg mt-2 group-hover:shadow-lg transition-all w-full"
                    >
                      Launch {tool.title}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✨ Coming Soon Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="max-w-3xl mx-auto border-2 shadow-lg text-center p-10 backdrop-blur-md rounded-2xl">
            <CardHeader>
              <CardTitle className="flex justify-center items-center gap-3 font-accent text-2xl md:text-3xl text-primary">
                <Sparkles className="h-6 w-6 text-primary" />
                More Creative Experiences Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Get ready for the <b>Color Therapy Mixer</b> and <b>Sound Painter</b> 🎧✨
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
}
