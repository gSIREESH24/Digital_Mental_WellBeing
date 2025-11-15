/**
 * Get today's emotion from localStorage or default to 'idle'
 * Maps mood values and emotion strings to the 4 supported emotions
 */
export function getTodayEmotion(): "happy" | "sad" | "angry" | "idle" {
  const today = new Date().toDateString();
  const stored = localStorage.getItem(`emotion_${today}`);
  
  if (stored) {
    const emotion = stored.toLowerCase();
    if (emotion === "happy" || emotion === "sad" || emotion === "angry" || emotion === "idle") {
      return emotion;
    }
  }

  // Check if there's a mood value stored (from MoodLogger)
  const moodValue = localStorage.getItem(`mood_${today}`);
  if (moodValue) {
    const value = parseInt(moodValue);
    // Map mood values to emotions: 5=Great->happy, 4=Good->happy, 3=Okay->idle, 2=Low->sad, 1=Very Low->angry
    if (value >= 4) return "happy";
    if (value === 3) return "idle";
    if (value === 2) return "sad";
    if (value === 1) return "angry";
  }

  // Check MoodScanner emotion
  const scannerEmotion = localStorage.getItem(`scanner_emotion_${today}`);
  if (scannerEmotion) {
    const emotion = scannerEmotion.toLowerCase();
    // Map scanner emotions to our 4 emotions
    if (emotion === "happy" || emotion === "surprise") return "happy";
    if (emotion === "sad" || emotion === "fear") return "sad";
    if (emotion === "angry" || emotion === "disgust") return "angry";
    if (emotion === "neutral") return "idle";
  }

  return "idle";
}

/**
 * Save today's emotion to localStorage
 */
export function saveTodayEmotion(emotion: "happy" | "sad" | "angry" | "idle") {
  const today = new Date().toDateString();
  localStorage.setItem(`emotion_${today}`, emotion);
}

