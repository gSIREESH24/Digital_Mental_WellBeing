"use client";

import { useState } from "react";
import { Heart, Eye, EyeOff, ArrowLeft, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Toast } from "@/lib/Toast1";
import { ThemeToggle } from "@/components/ThemeToggle";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useLocation, Link } from "wouter";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleChange = (e: any) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const res = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const userDoc = await getDoc(doc(db, "users", res.user.uid));
      const role = userDoc.exists() ? userDoc.data().role : "user";

      Toast({
        title: "Welcome 🎉",
        description: `Logged in as ${role}`,
      });

      // Redirect based on role - no delay needed, role is already determined
      setLocation("/");
    } catch (err: any) {
      Toast({
        title: "Login Failed ❌",
        description: err.message.includes("auth/invalid-credential")
          ? "Invalid email or password."
          : err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center overflow-hidden">
      {/* 🌓 Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* 🌈 Animated Background */}
      <section className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-green-300/20 to-blue-400/20 blur-3xl rounded-full -top-32 -left-40 animate-float-slow"></div>
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-pink-400/20 to-purple-400/20 blur-3xl rounded-full bottom-0 right-0 animate-float-slower"></div>
      </section>

      {/* 💫 Login Card */}
      <Card className="relative z-10 w-full max-w-lg border-2 backdrop-blur-xl bg-card/90 shadow-xl rounded-2xl animate-fade-in-up">
        <CardHeader className="text-center space-y-4 py-10">
          <Badge variant="secondary" className="mx-auto mb-2">
            Login
          </Badge>

          <div className="flex justify-center items-center gap-2">
            <Heart className="h-7 w-7 text-primary animate-pulse" fill="currentColor" />
            <span className="font-accent text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MindEase
            </span>
          </div>

          <CardTitle className="text-2xl font-semibold mt-3">Welcome Back!</CardTitle>
          <CardDescription className="text-muted-foreground">
            Access your MindEase Campus account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-12 space-y-8">
          {/* 🔙 Back to Home */}
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 mx-auto mb-4 rounded-full hover:scale-105 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          {/* 📨 Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-foreground">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full mt-1 p-3 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary/40 outline-none transition-all shadow-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-foreground">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full mt-1 p-3 pr-10 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary/40 outline-none transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex gap-2 items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="rounded border-border accent-primary"
                />
                Remember me
              </label>
              <a href="/forget" className="text-primary hover:text-accent font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Sign In */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-lg rounded-full font-semibold bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="h-5 w-5" />
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Register */}
            <p className="text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <a href="/register" className="text-primary font-semibold hover:underline">
                Register
              </a>
            </p>
          </form>
        </CardContent>
      </Card>

      {/* ✨ Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(20px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-40px) translateX(-20px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 14s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
      `}</style>
    </div>
  );
}
