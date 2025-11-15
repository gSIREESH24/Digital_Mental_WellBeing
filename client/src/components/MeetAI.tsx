import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Sparkles, Shield, Clock } from "lucide-react";
import { Link } from "wouter";

export function MeetAI() {
  return (
    <section className="w-full py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-block">
              <Badge variant="secondary" className="mb-2">Meet Your AI Assistant</Badge>
            </div>
            <div className="space-y-4">
              <h2 className="font-accent text-3xl md:text-4xl lg:text-5xl font-bold" data-testid="text-meet-ai-title">
                Your Compassionate AI Companion
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our AI assistant is trained to understand student mental health challenges with empathy and care. 
                It's like talking to a friend who's always there to listen, never judges, and offers helpful guidance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-card hover-elevate transition-all">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Smart & Understanding</h3>
                  <p className="text-sm text-muted-foreground">Recognizes emotional cues and responds with appropriate support</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card hover-elevate transition-all">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Private & Secure</h3>
                  <p className="text-sm text-muted-foreground">Your conversations are encrypted and completely confidential</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card hover-elevate transition-all">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Always Available</h3>
                  <p className="text-sm text-muted-foreground">24/7 support whenever you need someone to talk to</p>
                </div>
              </div>
            </div>

            <Link href="/chat">
              <Button size="lg" className="rounded-full transition-all hover:scale-105 shadow-lg" data-testid="button-try-ai">
                <MessageCircle className="mr-2 h-5 w-5" />
                Try AI Chat Now
              </Button>
            </Link>
          </div>

          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-3xl blur-3xl -z-10 animate-pulse-slow" />
            <Card className="border-2 shadow-2xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">MindEase AI</h3>
                    <p className="text-xs text-muted-foreground">Online • Ready to help</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                      <p className="text-sm">Hello! I'm here to support you. How are you feeling today?</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                      <p className="text-sm">I've been feeling stressed about exams...</p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                      <p className="text-sm">I understand exam stress can be overwhelming. Let's talk about some coping strategies that might help...</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex gap-2">
                    <div className="flex-1 bg-muted rounded-full px-4 py-2 text-sm text-muted-foreground">
                      Type your message...
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
