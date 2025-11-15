import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Video, FileText, Headphones, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const categories = [
  { name: "All", icon: BookOpen },
  { name: "Anxiety", icon: TrendingUp },
  { name: "Depression", icon: Headphones },
  { name: "Stress", icon: Clock },
  { name: "Sleep", icon: Video },
  { name: "Relationships", icon: FileText },
];

const resources = [
  {
    id: 1,
    title: "Understanding Anxiety: A Student's Guide",
    type: "Article",
    category: "Anxiety",
    duration: "8 min read",
    icon: FileText,
    description: "Learn about anxiety triggers, symptoms, and practical coping strategies for campus life.",
  },
  {
    id: 2,
    title: "Breathing Exercises for Stress Relief",
    type: "Video",
    category: "Stress",
    duration: "12 min",
    icon: Video,
    description: "Follow along with guided breathing techniques to calm your mind during stressful moments.",
  },
  {
    id: 3,
    title: "Sleep Better: Tips for Students",
    type: "Audio",
    category: "Sleep",
    duration: "15 min",
    icon: Headphones,
    description: "Guided meditation and sleep hygiene tips to improve your rest and recovery.",
  },
  {
    id: 4,
    title: "Managing Academic Pressure",
    type: "Article",
    category: "Stress",
    duration: "10 min read",
    icon: FileText,
    description: "Strategies to balance coursework, exams, and self-care without burning out.",
  },
  {
    id: 5,
    title: "Building Healthy Relationships",
    type: "Video",
    category: "Relationships",
    duration: "18 min",
    icon: Video,
    description: "Understanding boundaries, communication, and maintaining connections in college.",
  },
  {
    id: 6,
    title: "Recognizing Depression Signs",
    type: "Article",
    category: "Depression",
    duration: "7 min read",
    icon: FileText,
    description: "Identify early warning signs and when to seek professional support.",
  },
  {
    id: 7,
    title: "Mindfulness Meditation for Beginners",
    type: "Audio",
    category: "Anxiety",
    duration: "10 min",
    icon: Headphones,
    description: "Start your mindfulness journey with simple, effective meditation practices.",
  },
  {
    id: 8,
    title: "Coping with Homesickness",
    type: "Video",
    category: "Depression",
    duration: "14 min",
    icon: Video,
    description: "Practical advice for dealing with being away from home and adjusting to campus life.",
  },
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <section className="relative w-full py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
              <Badge variant="secondary" className="mb-2">Resource Library</Badge>
              <h1 className="font-accent text-4xl md:text-5xl lg:text-6xl font-bold" data-testid="text-resources-title">
                Mental Health Resources
              </h1>
              <p className="text-lg text-muted-foreground">
                Evidence-based articles, videos, and guides to support your mental wellness journey.
              </p>
              
              <div className="relative max-w-xl mx-auto mt-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-full text-base"
                  data-testid="input-search-resources"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Badge
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className="px-4 py-2 cursor-pointer hover-elevate active-elevate-2 transition-all hover:scale-105"
                  onClick={() => setSelectedCategory(category.name)}
                  data-testid={`badge-category-${category.name.toLowerCase()}`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                </Badge>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card
                  key={resource.id}
                  className="group hover-elevate transition-all duration-300 hover:shadow-xl border-2 hover:border-primary/30 animate-fade-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  data-testid={`card-resource-${resource.id}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors" data-testid={`text-resource-title-${resource.id}`}>
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {resource.duration}
                      </span>
                      <Link href={`/resources/${resource.id}`}>
                        <Button variant="ghost" size="sm" className="group-hover:text-primary" data-testid={`button-view-resource-${resource.id}`}>
                          View
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-20 animate-fade-in-up">
              <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">No resources found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filter</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
