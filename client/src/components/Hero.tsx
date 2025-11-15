import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Hero_supportive_students_illustration_d02ef8d9.png";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/30 -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <Badge variant="secondary" className="mb-2 border border-primary/20" data-testid="badge-tagline">
              🌱 Mental Health Support
            </Badge>
            <div className="space-y-4">
              <h1 className="font-accent text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent" data-testid="text-hero-title">
                Your Mental Health, Our Priority
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed" data-testid="text-hero-subtitle">
                AI-guided help, just when you need it. Anonymous. Secure. Stigma-free.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/chat">
                <Button size="lg" className="rounded-full text-base transition-all hover:scale-105 shadow-lg" data-testid="button-start-chat">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Chat Now
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="outline" size="lg" className="rounded-full text-base transition-all hover:scale-105" data-testid="button-explore-resources">
                  Explore Resources
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">100% Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Available 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Expert-Backed</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-3xl -z-10" />
            <img
              src={heroImage}
              alt="Diverse students supporting each other in a warm, inclusive environment"
              className="w-full h-auto rounded-3xl shadow-2xl"
              data-testid="img-hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
