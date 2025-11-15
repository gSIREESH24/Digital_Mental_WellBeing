"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from "wouter";

export default function useAuthGuard() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        alert("🔒 Please log in to access this page.");
        setLocation("/login");
      }
    });
    return unsubscribe;
  }, [setLocation]);
}
