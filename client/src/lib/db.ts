import { db } from "./firebase";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  arrayUnion,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

function getToday() {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}

// ------------------- GAME LOGGING -------------------
export async function logGamePlayed(uid: string, gameName: string) {
  const today = getToday();
  const docRef = doc(db, `users/${uid}/dailyStats/${today}`);

  await setDoc(
    docRef,
    {
      gamesPlayed: arrayUnion(gameName),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

// ------------------- RESOURCE LOGGING -------------------
export async function logResourceViewed(uid: string, resourceTitle: string) {
  const today = getToday();
  const docRef = doc(db, `users/${uid}/dailyStats/${today}`);

  await setDoc(
    docRef,
    {
      resourcesUsed: arrayUnion(resourceTitle),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

// ------------------- MOOD LOGGING -------------------
export async function logMood(uid: string, moodAvg: number) {
  const today = getToday();
  const docRef = doc(db, `users/${uid}/dailyStats/${today}`);

  await setDoc(
    docRef,
    {
      moodAvg,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

// ------------------- SAVE MOOD NOTE -------------------
export async function saveMoodNote(uid: string, note: string) {
  const today = getToday();
  const docRef = doc(db, `users/${uid}/dailyStats/${today}`);

  await setDoc(
    docRef,
    {
      moodNote: note,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

// ------------------- MOOD WITH EMOTION LOGGING -------------------
export interface MoodData {
  emotion: string | null;
  date: string;
  timestamp?: any;
  value?: number;
}

const emotionValues: Record<string, number> = {
  happy: 5,
  surprise: 4,
  neutral: 3,
  sad: 2,
  fear: 2,
  angry: 1,
  disgust: 1,
};

export async function logMoodWithEmotion(uid: string, emotion: string) {
  const today = getToday();
  const docRef = doc(db, `users/${uid}/dailyStats/${today}`);

  try {
    // Add mood entry to array in dailyStats
    const updateData: any = {
      moodEntries: arrayUnion({
        emotion: emotion.toLowerCase(),
        timestamp: serverTimestamp(),
      }),
      moodEmotion: emotion.toLowerCase(), // Latest emotion
      updatedAt: serverTimestamp(),
    };

    await setDoc(docRef, updateData, { merge: true });
    console.log(`Mood logged for ${today}: ${emotion}`);

    // Compute average from local data (don't refetch immediately due to consistency issues)
    // Average will be computed when MoodTrends fetches and displays
  } catch (err) {
    console.error("Error logging mood with emotion:", err);
  }
}

// ------------------- FETCH 7 DAYS MOOD DATA -------------------
export async function getMoodTrends(uid: string): Promise<MoodData[]> {
  const moodsRef = collection(db, `users/${uid}/moods`);
  const q = query(moodsRef, orderBy("date", "desc"), limit(7));
  
  const querySnapshot = await getDocs(q);
  const moods: MoodData[] = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    moods.push({
      emotion: data.emotion,
      date: data.date,
      timestamp: data.timestamp,
    });
  });
  
  // Sort by date ascending for display
  return moods.reverse();
}

// ------------------- GET MOODS FOR LAST 7 DAYS -------------------
export async function getLast7DaysMoods(uid: string): Promise<MoodData[]> {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // Include today, so 6 days ago

  const startDate = sevenDaysAgo.toISOString().split("T")[0];
  const endDate = today.toISOString().split("T")[0];

  const dailyStatsRef = collection(db, `users/${uid}/dailyStats`);
  const querySnapshot = await getDocs(dailyStatsRef);

  const result: MoodData[] = [];
  const moodMap = new Map<string, MoodData>();

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const dateStr = doc.id; // doc ID is the date (YYYY-MM-DD)

    // Only include dates within last 7 days
    if (dateStr >= startDate && dateStr <= endDate) {
      // Compute average from moodEntries array if it exists
      let avgValue: number | undefined;
      if (data.moodEntries && Array.isArray(data.moodEntries) && data.moodEntries.length > 0) {
        let total = 0;
        let count = 0;
        data.moodEntries.forEach((entry: any) => {
          const e = (entry.emotion || "").toLowerCase();
          const v = emotionValues[e] || 0;
          if (v > 0) {
            total += v;
            count++;
          }
        });
        avgValue = count > 0 ? +(total / count).toFixed(2) : undefined;
      }

      moodMap.set(dateStr, {
        emotion: data.moodEmotion || null,
        date: dateStr,
        value: avgValue,
      });
    }
  });

  // Generate array for last 7 days, filling missing days with nulls
  for (let i = 0; i < 7; i++) {
    const date = new Date(sevenDaysAgo);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];

    if (moodMap.has(dateStr)) {
      result.push(moodMap.get(dateStr)!);
    } else {
      // Include date even if no mood recorded
      result.push({
        emotion: null,
        date: dateStr,
      });
    }
  }

  console.log("getLast7DaysMoods result:", result); // DEBUG
  return result;
}

// ------------------- BOOKING SAVE -------------------
export interface BookingData {
  userId: string;
  userEmail: string;
  userName: string;
  counsellorId?: number;
  counsellorName: string;
  specialization: string;
  sessionType: "video" | "in-person";
  date: string;
  time: string;
  duration: string;
  price: string;
  status?: "pending" | "confirmed" | "completed" | "cancelled";
}

export async function saveBooking(bookingData: BookingData) {
  try {
    const bookingsRef = collection(db, "bookings");
    const bookingDoc = await addDoc(bookingsRef, {
      ...bookingData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: bookingData.status || "confirmed",
    });
    return bookingDoc.id;
  } catch (error) {
    console.error("Error saving booking:", error);
    throw error;
  }
}
