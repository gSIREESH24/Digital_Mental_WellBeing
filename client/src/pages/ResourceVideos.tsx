import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Clock, BookOpen, PlayCircle } from "lucide-react";

const interactiveVideos = [
  {
    id: 1,
    title: "5-Minute Meditation You Can Do Anywhere",
    duration: "5 min",
    category: "Breathwork",
    level: "Beginner",
    description:
      "A quick and effective guided meditation to help you find calm and clarity in just 5 minutes.",
    link: "https://www.youtube.com/watch?v=acUZdGd_3Dg",
    platform: "YouTube",
  },
  {
    id: 2,
    title: "10 Minute Body Scan Meditation",
    duration: "10 min",
    category: "Mindfulness",
    level: "All Levels",
    description:
      "Reduce stress and anxiety with this guided body scan meditation to help you relax and ground yourself.",
    link: "https://youtu.be/ANW1upLaNSg?si=aTx0_4N1Vmm0fTZF",
    platform: "YouTube",
  },
  {
    id: 3,
    title: "5 Minute Meditation for Focus",
    duration: "5 min",
    category: "Focus",
    level: "All Levels",
    description:
      "Regain your focus and concentration with this short, effective guided meditation session.",
    link: "https://www.youtube.com/watch?v=zSkFFW--Ma0",
    platform: "YouTube",
  },
  {
    id: 4,
    title: "Guided Sleep Meditation",
    duration: "10 min",
    category: "Sleep",
    level: "All Levels",
    description:
      "Drift off to sleep peacefully with this soothing guided meditation designed to help you relax.",
    link: "https://www.youtube.com/watch?v=t0kACis_dJE",
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

        <section className="container mx-auto px-4 py-8">
          <Card className="border-2 border-primary/20 bg-primary/5 overflow-hidden">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">Creators' Recommendation</Badge>
                <h2 className="text-2xl md:text-3xl font-bold font-accent">Try This Technique</h2>
                <p className="text-lg text-muted-foreground">
                  We highly recommend you try this specific technique as shown in the video. It's a powerful way to ground yourself and find immediate relief.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <PlayCircle className="w-5 h-5" />
                  <span>Watch Now</span>
                </div>
              </div>
              <div className="flex-1 w-full max-w-xl rounded-xl overflow-hidden shadow-lg border-2 border-background">
                <iframe
                  src="https://www.youtube.com/embed/KSpAdw4625U"
                  title="Recommended Technique"
                  className="w-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
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

                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

