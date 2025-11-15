"use client";

import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smile, Camera } from "lucide-react";

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
      setEmoji(data.emoji);
      
      // Save emotion to localStorage for the Model component
      const todayDateString = new Date().toDateString();
      localStorage.setItem(`scanner_emotion_${todayDateString}`, detectedEmotion);
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
    </div>
  );
}
