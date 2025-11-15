import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PanicButton } from "@/components/PanicButton";
import {
  TrendingUp,
  Smile,
  Moon,
  Calendar,
  Activity,
  BookOpen,
  Heart,
  ArrowUpCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link, useLocation } from "wouter";
import { MoodScanner } from "@/components/MoodScanner";

const moodData = [
  { day: "Mon", mood: 7, sleep: 6 },
  { day: "Tue", mood: 6, sleep: 7 },
  { day: "Wed", mood: 8, sleep: 8 },
  { day: "Thu", mood: 5, sleep: 5 },
  { day: "Fri", mood: 7, sleep: 6 },
  { day: "Sat", mood: 9, sleep: 9 },
  { day: "Sun", mood: 8, sleep: 8 },
];

const upcomingSessions = [
  {
    id: 1,
    counsellor: "Dr. Sarah Johnson",
    date: "Tomorrow",
    time: "2:00 PM",
    type: "Video Call",
  },
  {
    id: 2,
    counsellor: "Dr. Michael Chen",
    date: "Friday",
    time: "10:00 AM",
    type: "In-Person",
  },
];

const recentActivities = [
  {
    id: 1,
    activity: "Completed breathing exercise",
    time: "2 hours ago",
    icon: Activity,
  },
  {
    id: 2,
    activity: "Read article on stress management",
    time: "Yesterday",
    icon: BookOpen,
  },
  { id: 3, activity: "Logged mood: Happy", time: "Yesterday", icon: Smile },
  {
    id: 4,
    activity: "Joined peer support forum",
    time: "2 days ago",
    icon: Heart,
  },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [showTopBtn, setShowTopBtn] = useState(false);

  // 🆙 Scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⬆️ Scroll back to top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background relative">
      <Header />

      <main className="pt-24 pb-20">
        {/* 🌅 Hero Section */}
        <section className="relative w-full py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center">
                  <Badge variant="secondary" className="mb-2 mx-auto">
                    Dashboard
                  </Badge>
                  <h1
                    className="font-accent text-4xl md:text-5xl font-bold mb-2"
                    data-testid="text-dashboard-welcome"
                  >
                    Welcome back!
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Here’s an overview of your mental wellness journey 🌱
                  </p>
                </div>
                <PanicButton />
              </div>
            </div>
          </div>
        </section>

        {/* 🧩 Stats Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardStat
              icon={<TrendingUp className="h-6 w-6 text-white" />}
              gradient="from-green-500 to-emerald-600"
              label="Mood tracking streak"
              value="7 Days"
              badge="This Week"
              onClick={() => setLocation("/analytics/mood")}
            />
            <DashboardStat
              icon={<Smile className="h-6 w-6 text-white" />}
              gradient="from-blue-500 to-cyan-600"
              label="Weekly mood score"
              value="7.1/10"
              badge="Average"
              onClick={() => setLocation("/analytics/mood")}
            />
            <DashboardStat
              icon={<Moon className="h-6 w-6 text-white" />}
              gradient="from-purple-500 to-pink-600"
              label="Sleep per night"
              value="7 hours"
              badge="Average"
              onClick={() => setLocation("/analytics/sleep")}
            />
            <DashboardStat
              icon={<Calendar className="h-6 w-6 text-white" />}
              gradient="from-orange-500 to-red-600"
              label="Counselling sessions"
              value="3"
              badge="Total"
              onClick={() => setLocation("/booking")}
            />
          </div>

          {/* 📈 Charts + Sessions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card
              className="lg:col-span-2 border-2 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-accent text-2xl">
                  <Activity className="h-5 w-5 text-primary" />
                  Mood Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 🧘 Upcoming Sessions */}
            <Card className="border-2 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-accent text-xl">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 rounded-xl bg-secondary/50 hover-elevate transition-all"
                  >
                    <h4 className="font-semibold mb-1">{session.counsellor}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {session.date} at {session.time}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {session.type}
                    </Badge>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setLocation("/booking")}
                  className="w-full transition-all hover:scale-105"
                >
                  Book New Session
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 🌙 Sleep Chart + Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-2 border-2 animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-accent text-2xl">
                  <Moon className="h-5 w-5 text-primary" />
                  Sleep Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="sleep"
                      fill="hsl(var(--primary))"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-2 animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-accent text-xl">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.activity}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* 📸 Mood Scanner Integration */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <MoodScanner />
          </div>
        </section>
      </main>

      <Footer />
      <ChatBot />

      {/* ⬆️ Floating Scroll Button */}
      {showTopBtn && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full p-3 shadow-lg hover:scale-110 bg-primary text-primary-foreground"
        >
          <ArrowUpCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}

/* Reusable stat card component with click support */
function DashboardStat({
  icon,
  gradient,
  label,
  value,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  gradient: string;
  label: string;
  value: string;
  badge: string;
  onClick?: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      className="hover-elevate cursor-pointer transition-all duration-300 border-2 animate-fade-in-up hover:scale-[1.02]"
    >
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <div
            className={`h-12 w-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
          >
            {icon}
          </div>
          <Badge variant="secondary">{badge}</Badge>
        </div>
        <h3 className="text-3xl font-bold mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

