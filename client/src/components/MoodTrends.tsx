"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/firebase";
import { getLast7DaysMoods, MoodData } from "@/lib/db";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const emotionColors: Record<string, string> = {
  happy: "#10b981", // green
  surprise: "#f59e0b", // amber
  neutral: "#6b7280", // gray
  sad: "#3b82f6", // blue
  fear: "#8b5cf6", // purple
  angry: "#ef4444", // red
  disgust: "#ec4899", // pink
};

const emotionValues: Record<string, number> = {
  happy: 5,
  surprise: 4,
  neutral: 3,
  sad: 2,
  fear: 2,
  angry: 1,
  disgust: 1,
};

export function MoodTrends() {
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchMoodData = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const moods = await getLast7DaysMoods(user.uid);
        console.log("Fetched moods:", moods); // DEBUG
        setMoodData(moods);
      } catch (error) {
        console.error("Error fetching mood trends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodData();
    
    // Refresh when auth state changes
    const unsubscribe = auth.onAuthStateChanged(() => {
      fetchMoodData();
    });

    // Listen for custom refresh event
    const handleRefresh = () => {
      fetchMoodData();
    };
    window.addEventListener("moodUpdated", handleRefresh);

    return () => {
      unsubscribe();
      window.removeEventListener("moodUpdated", handleRefresh);
    };
  }, [refreshKey]);

  // Format data for charts
  const chartData = moodData.map((mood) => {
    const date = new Date(mood.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNumber = date.getDate();
    const finalValue = mood.value !== undefined
      ? mood.value
      : (mood.emotion ? emotionValues[mood.emotion.toLowerCase()] || 0 : 0);

    // Derive label: prefer explicit emotion, otherwise pick closest emotion to numeric value
    let label = "No data";
    if (mood.emotion) {
      label = mood.emotion.charAt(0).toUpperCase() + mood.emotion.slice(1);
    } else if (finalValue > 0) {
      const closest = Object.keys(emotionValues).reduce((best, key) => {
        const diffBest = Math.abs((emotionValues as any)[best] - finalValue);
        const diffKey = Math.abs((emotionValues as any)[key] - finalValue);
        return diffKey < diffBest ? key : best;
      }, Object.keys(emotionValues)[0]);
      label = closest.charAt(0).toUpperCase() + closest.slice(1);
    }

    return {
      day: `${dayName} ${dayNumber}`,
      date: mood.date,
      emotion: mood.emotion,
      value: finalValue,
      label,
    };
  });

  const hasData = moodData.some((mood) => mood.emotion !== null || (mood.value !== undefined && mood.value > 0));

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Mood Trends (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading mood trends...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!hasData) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Mood Trends (Last 7 Days)
          </CardTitle>
          <CardDescription>Track your mood over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No mood data available yet.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Use the Mood Scanner to start tracking your mood!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Mood Trends (Last 7 Days)
            </CardTitle>
            <CardDescription>Your emotional journey over the past week</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setRefreshKey(prev => prev + 1);
            }}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Line Chart */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 5]}
                tick={{ fontSize: 12 }}
                label={{ value: "Mood Score", angle: -90, position: "insideLeft" }}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg p-2 shadow-lg">
                        <p className="font-semibold">{data.day}</p>
                        <p className="text-sm">
                          <span className="font-medium">Mood: </span>
                          {data.label}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Score: </span>
                          {data.value}/5
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 5]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg p-2 shadow-lg">
                        <p className="font-semibold">{data.day}</p>
                        <p className="text-sm">
                          <span className="font-medium">Mood: </span>
                          {data.label}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Score: </span>
                          {data.value}/5
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="value" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Mood List */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg mb-3">Daily Mood Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
            {chartData.map((day, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border text-center ${
                  day.emotion
                    ? "bg-primary/10 border-primary/20"
                    : "bg-muted border-muted-foreground/20"
                }`}
              >
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  {day.day.split(" ")[0]}
                </p>
                <p className="text-xs mb-2">{day.day.split(" ")[1]}</p>
                {(day.emotion || (day.value !== undefined && day.value > 0)) ? (
                  <>
                    <div
                      className="w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-white text-xs font-bold"
                      style={{
                            backgroundColor: emotionColors[(day.emotion || day.label).toLowerCase()] || "#6b7280",
                      }}
                    >
                          {(day.emotion || day.label).charAt(0).toUpperCase()}
                    </div>
                    <p className="text-xs font-medium capitalize">{day.label}</p>
                  </>
                ) : (
                  <div className="w-8 h-8 rounded-full mx-auto mb-1 bg-muted-foreground/20 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">-</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

