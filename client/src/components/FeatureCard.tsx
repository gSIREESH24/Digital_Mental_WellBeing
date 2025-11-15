import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  onLearnMore?: () => void;
}

export function FeatureCard({ icon, title, description, onLearnMore }: FeatureCardProps) {
  return (
    <Card className="hover-elevate transition-all duration-300 cursor-pointer h-full" onClick={onLearnMore} data-testid={`card-feature-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="space-y-4">
        <div className="w-32 h-32 mx-auto">
          <img src={icon} alt={title} className="w-full h-full object-contain" data-testid={`img-feature-${title.toLowerCase().replace(/\s+/g, '-')}`} />
        </div>
        <CardTitle className="font-accent text-2xl text-center" data-testid={`text-feature-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-base text-center line-clamp-4" data-testid={`text-feature-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {description}
        </CardDescription>
        <button 
          className="flex items-center justify-center gap-2 text-primary font-medium mx-auto hover-elevate active-elevate-2 rounded-lg px-4 py-2 transition-colors"
          data-testid={`button-learn-more-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          Learn More
          <ArrowRight className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}
