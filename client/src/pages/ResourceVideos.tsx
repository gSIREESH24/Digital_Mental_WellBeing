import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Clock, BookOpen, PlayCircle } from "lucide-react";

const interactiveVideos = [
  {
    id: 1,
    title: "Guided Breathwork for Instant Calm",
    duration: "12 min",
    category: "Breathwork",
    level: "Beginner",
    description:
      "Follow along with rhythmic breathing animations and on-screen prompts to ease anxiety in minutes.",
    link: "https://www.youtube.com/watch?v=inpok4MKVLM",
    platform: "YouTube",
  },
  {
    id: 2,
    title: "Body Scan Meditation for Students",
    duration: "15 min",
    category: "Mindfulness",
    level: "All Levels",
    description:
      "An interactive body scan where you tap along with each zone to stay present and grounded.",
    link: "https://www.youtube.com/watch?v=WCQbxf868cc",
    platform: "YouTube",
  },
  {
    id: 3,
    title: "Focus Reset: Pomodoro Stretch Flow",
    duration: "10 min",
    category: "Focus",
    level: "All Levels",
    description:
      "Stretch, breathe, and refocus with guided timers that pair movement and attention cues.",
    link: "https://www.youtube.com/watch?v=mgkM5GFJ8L8",
    platform: "YouTube",
  },
  {
    id: 4,
    title: "Sleep Stories: Drift Into Rest",
    duration: "18 min",
    category: "Sleep",
    level: "All Levels",
    description:
      "Immersive narration + ambient visuals. Adjust ambient levels while you listen.",
    link: "https://www.youtube.com/watch?v=6p_yaNFSYao",
    platform: "YouTube",
  },
];

export default function ResourceVideos() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <section className="relative w-full py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4 text-center space-y-6">
            <Badge variant="secondary">Interactive Library</Badge>
            <h1 className="font-accent text-4xl md:text-5xl lg:text-6xl font-bold">
              Guided Video Sessions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tap along, breathe with guided prompts, and explore immersive practices designed for busy students.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 grid gap-8 lg:grid-cols-2">
          {interactiveVideos.map((video) => (
            <Card key={video.id} className="border-2 shadow-lg hover:shadow-xl transition-all animate-fade-in-up">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Video className="h-4 w-4" />
                    {video.category}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {video.duration}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-accent">{video.title}</CardTitle>
                <p className="text-muted-foreground">{video.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {video.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <PlayCircle className="h-4 w-4" />
                    {video.platform}
                  </span>
                </div>

                <div className="rounded-2xl overflow-hidden border bg-black">
                  <iframe
                    title={video.title}
                    src={video.link.replace("watch?v=", "embed/")}
                    className="w-full h-64"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="flex gap-3">
                  <a href={video.link} target="_blank" rel="noreferrer" className="w-full">
                    <Button className="w-full rounded-full hover:scale-105 transition">
                      Watch on {video.platform}
                    </Button>
                  </a>
                  <Button variant="outline" className="rounded-full">
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}

