import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Brain, BookOpen, Users, Calendar, TrendingUp, Palette } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Mood Analysis",
    description: "Track your emotions with intelligent insights and personalized recommendations.",
    action: "Try Dashboard",
    link: "/dashboard",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    icon: BookOpen,
    title: "Resource Library",
    description: "Access videos, articles, and guides on mental wellness tailored for students.",
    action: "Explore Resources",
    link: "/resources",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: Users,
    title: "Peer Support",
    description: "Connect anonymously with fellow students in a safe, judgment-free space.",
    action: "Join Community",
    link: "/support",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: Calendar,
    title: "Book Counselling",
    description: "Schedule confidential sessions with licensed mental health professionals.",
    action: "Book Now",
    link: "/counselors",
    gradient: "from-orange-500 to-red-600",
  },
  {
    icon: TrendingUp,
    title: "Games",
    description: "Engage in fun and interactive games designed to support your mental wellness.",
    action: "Take a break",
    link: "/games",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: Palette,
    title: "Creative Tools",
    description: "Express yourself with doodle pads, journals, and other wellness activities.",
    action: "Get Creative",
    link: "/creative-tools",
    gradient: "from-yellow-500 to-amber-600",
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <Badge variant="secondary" className="mb-2">Platform Features</Badge>
          <h2 className="font-accent text-3xl md:text-4xl lg:text-5xl font-bold" data-testid="text-features-title">
            Everything You Need for Mental Wellness
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit designed specifically for college students' mental health needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group hover-elevate transition-all duration-300 hover:shadow-xl border-2 hover:border-primary/30 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`card-feature-${index + 1}`}
              >
                <CardContent className="pt-8 pb-6 space-y-4">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-accent text-xl font-semibold" data-testid={`text-feature-title-${index + 1}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`text-feature-description-${index + 1}`}>
                    {feature.description}
                  </p>
                  <Link href={feature.link}>
                    <Button variant="ghost" className="w-full group-hover:text-primary transition-all hover:scale-105" data-testid={`button-${feature.action.toLowerCase().replace(/\s+/g, '-')}`}>
                      {feature.action} →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Badge({ children, variant, className }: { children: React.ReactNode; variant?: string; className?: string }) {
  return (
    <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground ${className}`}>
      {children}
    </span>
  );
}
