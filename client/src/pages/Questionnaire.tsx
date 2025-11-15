import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useLocation } from "wouter";
import {
  Brain,
  Heart,
  Zap,
  Activity,
  Users,
  TrendingUp,
  Flame,
  AlertCircle,
  Focus,
  Moon,
  Sparkles,
  HeartPulse,
  Eye,
  Waves,
  Baby,
  Utensils,
  Puzzle,
  Split,
  Briefcase,
  Clock,
  MessageSquare,
  Sunrise,
  GraduationCap,
  Users2,
  Rainbow,
} from "lucide-react";

const concerns = [
  { id: "anxiety", label: "Anxiety disorders", icon: AlertCircle },
  { id: "depression", label: "Depressive disorders", icon: Brain },
  { id: "overthinking", label: "Overthinking", icon: Zap },
  { id: "stress", label: "Stress management", icon: Activity },
  { id: "relationship", label: "Relationship skills", icon: Heart },
  { id: "self-improvement", label: "Self improvement", icon: TrendingUp },
  { id: "anger", label: "Anger management", icon: Flame },
  { id: "trauma", label: "Trauma-related disorders", icon: AlertCircle },
  { id: "adhd", label: "Adult ADHD", icon: Focus },
  { id: "sleep", label: "Sleep disorders", icon: Moon },
  { id: "personality", label: "Personality disorders", icon: Sparkles },
  { id: "sexual", label: "Sexual Dysfunctions", icon: HeartPulse },
  { id: "ocd", label: "OCD", icon: Eye },
  { id: "bipolar", label: "Bipolar disorder", icon: Waves },
  { id: "fertility", label: "Fertility & Pregnancy concerns", icon: Baby },
  { id: "eating", label: "Eating disorders", icon: Utensils },
  { id: "autism", label: "Adult Autism", icon: Puzzle },
  { id: "schizophrenia", label: "Schizophrenia", icon: Split },
  { id: "work", label: "Work-related concerns", icon: Briefcase },
  { id: "geriatric", label: "Geriatric mental health", icon: Clock },
  { id: "communication", label: "Communication skills", icon: MessageSquare },
  { id: "life-transitions", label: "Life transitions", icon: Sunrise },
  { id: "academic", label: "Academic concerns", icon: GraduationCap },
  { id: "parenting", label: "Parenting concerns", icon: Users2 },
  { id: "lgbtqia", label: "LGBTQIA+ Concerns", icon: Rainbow },
];

const questions = [
  {
    id: "duration",
    question: "Since when have you been experiencing this?",
    options: [
      "Less than a month",
      "1-3 months",
      "3-6 months",
      "6 months - 1 year",
      "More than 1 year",
    ],
  },
  {
    id: "difficulty",
    question: "How difficult is it to manage these concerns?",
    options: [
      "Minimal - Barely affects daily life",
      "Mild - Occasionally challenging",
      "Moderate - Frequently challenging",
      "Severe - Very difficult to manage",
      "Extremely Severe - Unable to function normally",
    ],
  },
  {
    id: "self-harm",
    question: "Have you experienced thoughts of self-harm?",
    options: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Prefer not to answer",
    ],
  },
  {
    id: "age-preference",
    question: "Do you have an age preference for your therapist?",
    options: [
      "25-35 years",
      "35-45 years",
      "45-55 years",
      "55+ years",
      "No preference",
    ],
  },
  {
    id: "language",
    question: "Which language are you most comfortable with?",
    options: [
      "English",
      "Spanish",
      "Mandarin",
      "Hindi",
      "Other",
    ],
  },
  {
    id: "gender-preference",
    question: "Do you have a gender preference for your therapist?",
    options: [
      "Male",
      "Female",
      "Non-binary",
      "No preference",
    ],
  },
  {
    id: "session-type",
    question: "Do you prefer online or in-person sessions?",
    options: [
      "Online only",
      "In-person only",
      "Flexible (both)",
      "Undecided",
    ],
  },
];

export default function Questionnaire() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const totalSteps = questions.length + 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleConcernToggle = (concernId: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concernId)
        ? prev.filter((id) => id !== concernId)
        : [...prev, concernId]
    );
  };

  const handleAnswer = (answer: string) => {
    const question = questions[currentStep - 1];
    setAnswers((prev) => ({ ...prev, [question.id]: answer }));
  };

  const handleNext = () => {
    if (currentStep === 0 && selectedConcerns.length === 0) {
      alert("Please select at least one concern");
      return;
    }
    if (currentStep > 0 && currentStep <= questions.length) {
      const question = questions[currentStep - 1];
      if (!answers[question.id]) {
        alert("Please select an answer");
        return;
      }
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setLocation("/counselors/results");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12 pt-24 max-w-4xl">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Find Your Perfect Therapist
          </h1>
          <p className="text-center text-muted-foreground mb-6">
            Answer {totalSteps} questions to get matched with certified therapists
          </p>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center mt-2">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </div>

        {currentStep === 0 && (
          <Card className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">What are your major concerns?</h2>
              <p className="text-muted-foreground text-sm">
                Select all that apply. Your answers will be kept confidential and our care team will help you find the right therapist.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {concerns.map((concern) => {
                const Icon = concern.icon;
                const isSelected = selectedConcerns.includes(concern.id);
                return (
                  <Card
                    key={concern.id}
                    className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? "ring-2 ring-primary bg-primary/5" : ""
                    }`}
                    onClick={() => handleConcernToggle(concern.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">{concern.label}</span>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="mt-6 text-sm text-muted-foreground">
              <p>✓ {totalSteps} questions total</p>
              <p>✓ All answers are confidential</p>
              <p>✓ Our care team will help match you with the right professional</p>
            </div>
          </Card>
        )}

        {currentStep > 0 && currentStep <= questions.length && (
          <Card className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <h2 className="text-2xl font-bold mb-6">{questions[currentStep - 1].question}</h2>
            <RadioGroup
              value={answers[questions[currentStep - 1].id] || ""}
              onValueChange={handleAnswer}
            >
              <div className="space-y-3">
                {questions[currentStep - 1].options.map((option) => (
                  <Label
                    key={option}
                    htmlFor={option}
                    className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                  >
                    <RadioGroupItem value={option} id={option} />
                    <span>{option}</span>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </Card>
        )}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {currentStep === totalSteps - 1 ? "View Results" : "Next"}
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
