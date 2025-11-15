import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Search, Home } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const gamesList = [
  { id: 1, name: "Mind Maze", category: "Puzzle", description: "Challenge your logic and problem-solving skills.", icon: "🧩" },
  { id: 2, name: "Calm Clouds", category: "Relaxation", description: "Tap clouds and relax with soothing sounds.", icon: "☁️" },
  { id: 3, name: "Focus Dash", category: "Focus", description: "Boost your focus by dodging distractions.", icon: "🎯" },
  { id: 4, name: "Memory Match", category: "Memory", description: "Test your short-term memory with quick rounds.", icon: "🧠" },
  { id: 5, name: "Zen Garden", category: "Mindfulness", description: "Create and decorate your calming zen garden.", icon: "🌸" },
  { id: 6, name: "Color Flow", category: "Creativity", description: "Connect matching colors to clear your mind.", icon: "🎨" },
  { id: 7, name: "Breathe Easy", category: "Relaxation", description: "Follow guided breathing exercises to unwind.", icon: "🌬️" },
  { id: 8, name: "Happy Steps", category: "Positivity", description: "Walk your way through gratitude prompts.", icon: "🚶‍♀️" },
  { id: 9, name: "Sound Journey", category: "Calm", description: "Listen and match soothing sounds for mindfulness.", icon: "🎵" },
  { id: 10, name: "Focus Blocks", category: "Focus", description: "Stack blocks in perfect rhythm to train patience.", icon: "🧱" },
  { id: 11, name: "RelaxRace", category: "Multiplayer", description: "Compete with friends in a mindful race where calmness wins.", icon: "🏁" },
  { id: 12, name: "MindLink", category: "Multiplayer", description: "Connect with a partner to sync breathing and achieve flow together.", icon: "🔗" },
  { id: 13, name: "Trivia of Tranquility", category: "Knowledge", description: "Answer relaxing trivia questions to learn mindfulness facts.", icon: "📚" },
  { id: 14, name: "Emoji Balance", category: "Focus", description: "Keep your mood balanced by catching only positive emojis.", icon: "😊" },
  { id: 15, name: "Serenity Sprint", category: "Focus", description: "Run through calming landscapes collecting mindful thoughts.", icon: "🏃‍♂️" },
  { id: 16, name: "Harmony Tiles", category: "Multiplayer", description: "Play synchronized rhythm tiles with a partner to achieve harmony.", icon: "🎹" },
  { id: 17, name: "Mood Match", category: "Memory", description: "Match pairs of emotions and colors to train emotional awareness.", icon: "💖" },
  { id: 18, name: "Peace Pong", category: "Multiplayer", description: "Classic pong but with soft visuals and chill ambient sound.", icon: "🏓" },
  { id: 19, name: "Echo Garden", category: "Relaxation", description: "Grow plants with your voice or music input — watch serenity bloom.", icon: "🌿" },
  { id: 20, name: "Wave Calm", category: "Focus", description: "Control ocean waves with your breathing rhythm.", icon: "🌊" },
];

export default function Games() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const categories = ["All", ...Array.from(new Set(gamesList.map((g) => g.category)))];

  const filteredGames = gamesList.filter((game) => {
    const matchesSearch =
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || game.category === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* 🌤️ Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/20 text-center">
        <div className="container mx-auto px-4 space-y-8 animate-fade-in-up">
          <Badge variant="secondary" className="mb-2">Games</Badge>
          <h1 className="font-accent text-5xl md:text-6xl font-bold mb-4">
            Mindful Games 🎮
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reconnect with yourself and others through calming, focus-boosting, and multiplayer mindfulness games.
          </p>

          {/* 🔍 Modern Search Bar */}
          <div className="relative max-w-2xl mx-auto mt-10">
            <Search className="absolute left-5 top-3.5 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search games, e.g. Relax, Focus, Memory..."
              className="w-full pl-12 pr-5 py-3.5 text-base rounded-full border border-border bg-card shadow-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 🧭 Category Chip Bar */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filterType === cat ? "default" : "outline"}
                size="sm"
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                  filterType === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-primary/10 hover:text-primary border-border"
                }`}
                onClick={() => setFilterType(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* 🕹️ Games Section */}
      <section className="container mx-auto px-4 py-20 space-y-12">
        <Card className="border-2 animate-fade-in-up backdrop-blur-md bg-card/70 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="flex items-center justify-center gap-2 font-accent text-3xl md:text-4xl">
              <Gamepad2 className="h-7 w-7 text-primary" />
              Play, Relax & Recharge
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-10">
            {/* 🎮 Game Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
              {filteredGames.map((game) => (
                <Card
                  key={game.id}
                  className="p-6 border-2 bg-gradient-to-br from-secondary/20 via-background to-secondary/30 rounded-2xl hover:shadow-2xl transition-all hover:scale-[1.03]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{game.icon}</span>
                    <h3 className="font-bold text-lg">{game.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {game.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge
                      variant="outline"
                      className={`text-xs px-3 py-1 rounded-full ${
                        game.category === "Multiplayer"
                          ? "bg-primary/10 text-primary"
                          : ""
                      }`}
                    >
                      {game.category}
                    </Badge>
                    <Link href={`/game/${encodeURIComponent(game.name)}`}>
                      <Button
                        size="sm"
                        className="rounded-full hover:scale-110 hover:shadow-lg transition-all duration-300"
                      >
                        Play
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}

              {filteredGames.length === 0 && (
                <p className="text-center col-span-full text-muted-foreground italic">
                  No games found matching your search.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 🏠 Return to Home Button */}
        <div className="flex justify-center mt-12">
          <Link href="/">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg hover:scale-110 hover:shadow-lg flex items-center gap-2 transition-all"
            >
              <Home className="h-5 w-5" />
              Return to Home
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
}
