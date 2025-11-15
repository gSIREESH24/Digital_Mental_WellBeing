import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Users, Award, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Confidential",
    description: "Your privacy is sacred. All conversations are encrypted and anonymous.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Mental health doesn't follow a schedule. We're here whenever you need us.",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: Users,
    title: "Peer Community",
    description: "Connect with fellow students who understand your journey and challenges.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Award,
    title: "Licensed Professionals",
    description: "Access to qualified campus counsellors with mental health expertise.",
    gradient: "from-orange-500 to-red-600",
  },
  {
    icon: Heart,
    title: "Empathetic AI",
    description: "Our AI is trained with compassion, understanding student-specific concerns.",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: Sparkles,
    title: "Evidence-Based",
    description: "Resources backed by psychology research and clinical best practices.",
    gradient: "from-indigo-500 to-purple-600",
  },
];

export function WhyChooseUs() {
  return (
    <section className="w-full py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <Badge variant="secondary" className="mb-2">Why Choose Us</Badge>
          <h2 className="font-accent text-3xl md:text-4xl lg:text-5xl font-bold" data-testid="text-why-choose-title">
            Trusted Mental Health Support
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've built a platform that truly understands and cares about student well-being.
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
