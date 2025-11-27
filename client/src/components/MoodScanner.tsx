"use client";

import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smile, Camera } from "lucide-react";
import { EmotionModelViewer } from "./EmotionModelViewer";
import { MoodTrends } from "./MoodTrends";
import { auth } from "@/lib/firebase";
import { logMoodWithEmotion } from "@/lib/db";

export  function MoodScanner() {
  const webcamRef = useRef<Webcam | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [emoji, setEmoji] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) setCapturedImage(imageSrc);
  }, [webcamRef]);
  const analyzeMood = async () => {
    if (!capturedImage) return alert("Please capture an image first!");
    setLoading(true);
    try {
      const res = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: capturedImage }),
      });
      const data = await res.json();
      const detectedEmotion = data.emotion;
      setEmotion(detectedEmotion);
      
      // Map emotions to emojis
      const emotionEmojis: Record<string, string> = {
        happy: "😊",
        sad: "😢",
        angry: "😠",
        fear: "😨",
        surprise: "😲",
        disgust: "🤢",
        neutral: "😐",
      };
      setEmoji(emotionEmojis[detectedEmotion.toLowerCase()] || "😐");
      
      // Save emotion to localStorage for the Model component
      const todayDateString = new Date().toDateString();
      localStorage.setItem(`scanner_emotion_${todayDateString}`, detectedEmotion);
      
      // Store mood in database for current user
      const user = auth.currentUser;
      if (user) {
        try {
          console.log("Saving mood to DB for user:", user.uid, "emotion:", detectedEmotion); // DEBUG
          await logMoodWithEmotion(user.uid, detectedEmotion);
          console.log("Mood saved successfully"); // DEBUG
          // Trigger refresh event for MoodTrends component
          window.dispatchEvent(new Event("moodUpdated"));
        } catch (dbError) {
          console.error("Error saving mood to database:", dbError);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Error analyzing mood.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-semibold text-center">
        Mood Scanner <Smile className="inline-block ml-2" />
      </h1>

      <Card className="w-full max-w-lg shadow-lg p-4 rounded-2xl">
        <CardContent className="flex flex-col items-center gap-4">
          {/* Webcam preview */}
          {!capturedImage ? (
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={{
                facingMode: "user", 
              }}
              className="rounded-xl border w-full aspect-video object-cover"
            />
          ) : (
            <img
              src={capturedImage}
              alt="Captured"
              className="rounded-xl border w-full aspect-video object-cover"
            />
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-3">
            {!capturedImage ? (
              <Button onClick={capture} className="bg-blue-600">
                <Camera className="mr-2 h-4 w-4" /> Capture
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setCapturedImage(null);
                  setEmotion(null);
                  setEmoji(null);
                }}
                className="bg-gray-500"
              >
                Retake
              </Button>
            )}
            <Button
              onClick={analyzeMood}
              disabled={!capturedImage || loading}
              className="bg-green-600"
            >
              {loading ? "Analyzing..." : "Analyze Mood"}
            </Button>
          </div>

          {/* 🧠 Mood result */}
          {emotion && (
            <div className="mt-4 text-center">
              <p className="text-xl font-semibold">Mood Detected:</p>
              <p className="text-2xl mt-1">
                {emoji} {emotion}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Display 3D Model after mood checking is done */}
      {emotion && (
        <Card className="w-full max-w-4xl shadow-lg p-4 rounded-2xl mt-6">
          <CardContent className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Your Mood Visualization
            </h2>
            <div className="w-full">
              <EmotionModelViewer 
                emotion={
                  emotion === "happy" ? "happy" :
                  emotion === "sad" ? "sad" :
                  emotion === "angry" ? "angry" :
                  emotion === "fear" ? "fear" :
                  emotion === "surprise" ? "surprise" :
                  "idle"
                } 
              />
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg w-full">
              <p className="text-sm font-medium">
                Current Emotion: <span className="text-primary capitalize">{emotion}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Display Mood Trends for Last 7 Days */}
      <div className="w-full max-w-6xl mt-6">
        <MoodTrends />
      </div>
    </div>
  );
}
