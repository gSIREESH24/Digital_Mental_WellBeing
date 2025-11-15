import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { MeetAI } from "@/components/MeetAI";
import { Testimonials } from "@/components/Testimonials";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";

export default function InstHome() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <MeetAI />
      <FeaturesSection />
      <Testimonials />
      <Footer />
      <ChatBot />
    </div>
  );
}
