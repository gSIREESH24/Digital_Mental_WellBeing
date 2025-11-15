import { ThemeProvider } from "../ThemeProvider";
import { FeatureCard } from "../FeatureCard";
import chatbotIcon from "@assets/generated_images/AI_Chatbot_icon_dbaab709.png";

export default function FeatureCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-sm">
        <FeatureCard
          icon={chatbotIcon}
          title="AI Chatbot"
          description="Get instant support anytime with our AI-powered mental health assistant. Trained to understand and respond to your concerns with empathy and care."
          onLearnMore={() => console.log("Learn more clicked")}
        />
      </div>
    </ThemeProvider>
  );
}
