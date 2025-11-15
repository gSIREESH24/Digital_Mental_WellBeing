"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { MeetAI } from "@/components/MeetAI";
import { Testimonials } from "@/components/Testimonials";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { auth } from "@/lib/firebase";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";

export default function Home() {
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* ✅ Simplified Header (now self-contained) */}
      <Header />

      {/* 🌈 Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-green-300/20 to-blue-400/20 blur-3xl rounded-full -top-40 -left-40 animate-float-slow"></div>
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-pink-400/20 to-purple-400/20 blur-3xl rounded-full bottom-0 right-0 animate-float-slower"></div>

      {/* 🏠 Main Content */}
      {!showProfile && !showSettings ? (
        <>
          <Hero />
          <HowItWorks />
          <FeaturesSection />
          <WhyChooseUs />
          <MeetAI />
          <Testimonials />
          <Footer />
          <ChatBot />
        </>
      ) : showProfile ? (
        <ProfilePage onBack={() => setShowProfile(false)} />
      ) : (
        <SettingsPage onBack={() => setShowSettings(false)} />
      )}

      {/* ✨ Floating Animation Styles */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(20px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-40px) translateX(-20px); }
        }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 14s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
