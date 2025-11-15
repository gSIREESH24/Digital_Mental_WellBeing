import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { Brain, Baby, Heart, Star, MapPin, MessageCircle } from "lucide-react";
import { getFeaturedTherapists } from "@/data/therapists";

const expertTypes = [
  { id: "therapist", name: "Therapist", icon: Brain, color: "bg-blue-100 text-blue-600" },
  { id: "psychiatrist", name: "Psychiatrist", icon: Brain, color: "bg-purple-100 text-purple-600" },
  { id: "child-youth", name: "Child & Youth Expert", icon: Baby, color: "bg-green-100 text-green-600" },
  { id: "couples", name: "Couples Psychiatrist", icon: Heart, color: "bg-pink-100 text-pink-600" },
];

const offlineLocations = [
  { name: "MindEase Campus Center", address: "123 University Ave, Building A", city: "Downtown" },
  { name: "Wellness Hub North", address: "456 Health St, Suite 200", city: "North District" },
  { name: "Student Support Center", address: "789 Campus Dr, Floor 3", city: "East Campus" },
];

const reviews = [
  { name: "Alex M.", rating: 5, text: "Dr. Johnson helped me through my anxiety. Highly recommend!", date: "2 weeks ago" },
  { name: "Jordan P.", rating: 5, text: "The questionnaire made it easy to find the right therapist for me.", date: "1 month ago" },
  { name: "Sam K.", rating: 4, text: "Great platform! Convenient online sessions that fit my schedule.", date: "3 weeks ago" },
];

export default function Counselors() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const featuredTherapists = getFeaturedTherapists(2);

  const handleSpecialtyClick = (specialty: string) => {
    setSelectedType(specialty);
    setLocation(`/counselors/all?specialty=${specialty}`);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-emerald-50 dark:from-slate-900 dark:via-background dark:to-emerald-950 relative overflow-hidden">
      <Header />

      {/* 🌈 Animated Glow Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-3xl rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-purple-400/10 blur-3xl rounded-full animate-pulse-slower" />
      </div>

      <div className="container mx-auto px-4 py-12 pt-28">
        {/* 🧠 Hero Section */}
        <div className="text-center mb-16 backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 rounded-3xl p-10 border border-white/20 shadow-xl animate-fade-in-up transition-all duration-700">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
            Find an Expert Who Understands You
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with certified professionals who specialize in your unique needs.
          </p>
        </div>

        {/* 💬 Expert Types */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          {expertTypes.map((type, index) => (
            <Card
              key={type.id}
              className={`p-6 cursor-pointer backdrop-blur-md transition-all duration-500 border-2 hover:-translate-y-1 hover:shadow-lg ${
                selectedType === type.id ? "ring-2 ring-primary scale-105" : "hover:border-primary/40"
              }`}
              style={{ animationDelay: `${index * 120}ms` }}
              onClick={() => handleSpecialtyClick(type.id)}
            >
              <div className={`w-14 h-14 rounded-full ${type.color} flex items-center justify-center mb-3 mx-auto animate-pulse`}>
                <type.icon className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-semibold text-center">{type.name}</h3>
            </Card>
          ))}
        </div>

        {/* 🌟 Featured Therapists Section */}
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {/* Left Card */}
          <Card className="md:col-span-1 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Need Help Finding a Therapist?</h2>
              <p className="text-muted-foreground mb-6">
                Answer a few quick questions and we'll match you with the perfect expert.
              </p>
            </div>
            <Link href="/counselors/questionnaire" className="block">
              <Button className="w-full mt-auto py-6 text-base bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all">
                Start Now
              </Button>
            </Link>
          </Card>

          {/* Right Cards */}
          <div className="md:col-span-2">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold">Featured Therapists</h2>
              <Link href="/counselors/all">
                <Button variant="outline" className="hover:bg-primary hover:text-white transition-all rounded-full px-6 py-2 shadow-sm hover:shadow-md">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-5">
              {featuredTherapists.map((therapist, index) => (
                <Card
                  key={therapist.id}
                  className="p-6 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-primary/20 rounded-2xl"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <img
                      src={therapist.image}
                      alt={therapist.name}
                      className="w-20 h-20 rounded-full object-cover shadow-md hover:scale-110 transition-transform duration-300"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                        <div>
                          <h3 className="text-xl font-semibold">{therapist.name}</h3>
                          <p className="text-sm text-muted-foreground">{therapist.title}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{therapist.rating}</span>
                            <span className="text-sm text-muted-foreground">({therapist.reviews})</span>
                          </div>
                          <p className="text-lg font-bold text-primary mt-1">${therapist.price}/session</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{therapist.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {therapist.specializations.map((spec) => (
                          <span key={spec} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs transition-all hover:scale-105">
                            {spec}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 mt-3">
                        <Link href={`/counselors/profile/${therapist.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full px-5 py-2 hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md"
                          >
                            View Profile
                          </Button>
                        </Link>
                        <Link href={`/booking?therapist=${therapist.id}`}>
                          <Button
                            size="sm"
                            className="rounded-full px-5 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:scale-105 hover:shadow-lg transition-all"
                          >
                            Book Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* ✨ Special Offer */}
        <Card className="p-8 mb-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-center shadow-xl relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-[url('/images/confetti.svg')] opacity-10 animate-pulse" />
          <h2 className="text-3xl font-bold mb-3">🎁 Special Offer!</h2>
          <p className="text-lg mb-2">Get 20% off your first session with any therapist</p>
          <p className="text-sm opacity-90">
            Use code: <span className="font-bold">MINDEASE20</span> at checkout
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/counselors/all">
              <Button className="rounded-full px-6 py-3 bg-white text-primary font-semibold hover:bg-blue-100 transition-all shadow-md hover:shadow-lg">
                Explore Therapists
              </Button>
            </Link>
          </div>
        </Card>

        {/* 💬 Support Card */}
        <Card className="p-8 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-all rounded-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <MessageCircle className="w-12 h-12 text-green-600 animate-pulse" />
              <div>
                <h2 className="text-2xl font-bold">Need Immediate Support?</h2>
                <p className="text-muted-foreground">Chat with our support team on WhatsApp</p>
              </div>
            </div>
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 hover:scale-105 hover:shadow-lg transition-all"
            >
              Chat on WhatsApp
            </Button>
          </div>
        </Card>
      </div>

      <Footer />

      {/* 🌀 Background Animations */}
      <style>{`
        @keyframes pulse-slow { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes pulse-slower { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
        .animate-pulse-slow{animation:pulse-slow 10s ease-in-out infinite}
        .animate-pulse-slower{animation:pulse-slower 14s ease-in-out infinite}
        .animate-gradient { background-size: 200% 200%; animation: gradientShift 8s ease infinite; }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
