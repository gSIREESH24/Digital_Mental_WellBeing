"use client";

import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { auth } from "@/lib/firebase";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Settings,
  User,
  ChevronDown,
  Gamepad2,
  Brush,
  Brain,
  Heart,
  BookOpen,
  PlayCircle,
  Box,
} from "lucide-react";
import { useTheme } from "next-themes";
import { EmotionModelDialog } from "@/components/EmotionModelDialog";

export function Header() {
  const [user, setUser] = useState(auth.currentUser);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModelDialogOpen, setIsModelDialogOpen] = useState(false);
  const { theme } = useTheme();
  const [, setLocation] = useLocation();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const resourcesDropdownRef = useRef<HTMLDivElement | null>(null);
  let hoverTimeout: NodeJS.Timeout;
  let resourcesHoverTimeout: NodeJS.Timeout;

  // 🔐 Track Firebase auth state
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  // 🌪️ Scroll shrink effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🧠 Dropdown hover logic
  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setIsFeaturesOpen(true);
  };
  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => setIsFeaturesOpen(false), 250);
  };

  const handleResourcesEnter = () => {
    clearTimeout(resourcesHoverTimeout);
    setIsResourcesOpen(true);
  };
  const handleResourcesLeave = () => {
    resourcesHoverTimeout = setTimeout(() => setIsResourcesOpen(false), 250);
  };

  // 💚 Theme-based heart color
  const heartColor =
    theme === "dark"
      ? "text-emerald-300 drop-shadow-[0_0_6px_rgba(16,185,129,0.6)]"
      : "text-green-500";

  // 🚪 Global Logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setLocation("/login"); // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const displayName = user?.displayName || "MindEase User";
  const photoURL = user?.photoURL || "";
  const initials = displayName
    .split(" ")
    .map((w) => w[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-xl border-b ${
        isScrolled
          ? "py-3 bg-background/95 shadow-lg border-border/50"
          : "py-5 bg-background/80 border-border/30"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-8 md:px-12 transition-all duration-300">
        {/* 🌿 Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <Heart
              className={`h-6 w-6 ${heartColor} animate-pulse transition-all duration-500`}
              fill="currentColor"
            />
            <h1
              className={`font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all duration-300 ${
                isScrolled ? "text-2xl" : "text-3xl"
              }`}
            >
              MindEase
            </h1>
          </div>
        </Link>

        {/* 🧭 Navigation */}
        <nav
          className={`hidden md:flex items-center gap-8 font-medium transition-all duration-300 ${
            isScrolled ? "text-[14px]" : "text-[15px]"
          }`}
        >
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>

          {/* 🌟 Features Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
          >
            <button
              className="flex items-center gap-1 hover:text-primary transition cursor-pointer"
              onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
            >
              Features
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isFeaturesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute top-8 left-0 mt-3 w-56 bg-card border border-border rounded-xl shadow-xl backdrop-blur-2xl transition-all duration-300 ${
                isFeaturesOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible translate-y-2"
              }`}
            >
              <Link
                href="/games"
                className="flex items-center gap-3 px-4 py-2 hover:bg-primary/10 transition text-sm rounded-t-xl"
              >
                <Gamepad2 className="h-4 w-4 text-primary" />
                Games
              </Link>
              <Link
                href="/creative-tools"
                className="flex items-center gap-3 px-4 py-2 hover:bg-primary/10 transition text-sm"
              >
                <Brush className="h-4 w-4 text-accent" />
                Creative Tools
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-2 hover:bg-primary/10 transition text-sm rounded-b-xl"
              >
                <Brain className="h-4 w-4 text-emerald-500" />
                AI Mood Analysis
              </Link>
            </div>
          </div>

          {/* 📚 Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleResourcesEnter}
            onMouseLeave={handleResourcesLeave}
            ref={resourcesDropdownRef}
          >
            <button
              className="flex items-center gap-1 hover:text-primary transition cursor-pointer"
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            >
              Resources
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isResourcesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute top-8 left-0 mt-3 w-56 bg-card border border-border rounded-xl shadow-xl backdrop-blur-2xl transition-all duration-300 ${
                isResourcesOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible translate-y-2"
              }`}
            >
              <Link
                href="/resources"
                className="flex items-center gap-3 px-4 py-2 hover:bg-primary/10 transition text-sm rounded-t-xl"
              >
                <BookOpen className="h-4 w-4 text-primary" />
                Documents
              </Link>
              <Link
                href="/resources/videos"
                className="flex items-center gap-3 px-4 py-2 hover:bg-primary/10 transition text-sm rounded-b-xl"
              >
                <PlayCircle className="h-4 w-4 text-primary" />
                Videos
              </Link>
            </div>
          </div>
          <Link href="/support" className="hover:text-primary transition">
            Support
          </Link>
          <Link href="/counselors" className="hover:text-primary transition">
            Book Counselling
          </Link>
        </nav>

        {/* 🌗 Theme + Model + Profile */}
        <div className="flex items-center gap-4">
          {user && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModelDialogOpen(true)}
              className="hidden md:flex items-center gap-2"
            >
              <Box className="h-4 w-4" />
              Model
            </Button>
          )}
          <ThemeToggle />

          {user ? (
            <div className="relative group">
              <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden cursor-pointer hover:scale-105 transition-all shadow-sm">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-primary/10 text-primary font-semibold">
                    {initials || <User className="h-4 w-4" />}
                  </div>
                )}
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 mt-3 w-52 bg-card border border-border rounded-xl shadow-lg backdrop-blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="p-3 text-sm">
                  <p className="font-semibold">{displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-foreground hover:bg-primary/10"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-foreground hover:bg-primary/10"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      {user && (
        <EmotionModelDialog
          open={isModelDialogOpen}
          onOpenChange={setIsModelDialogOpen}
        />
      )}
    </header>
  );
}
