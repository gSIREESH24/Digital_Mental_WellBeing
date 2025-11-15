"use client";

import { useState } from "react";
import { Heart, Eye, EyeOff, ArrowLeft, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Toast } from "@/lib/Toast1";
import { ThemeToggle } from "@/components/ThemeToggle";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useLocation, Link } from "wouter";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [role, setRole] = useState("user"); // 👈 NEW: Role selector
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (formData.password !== formData.confirm) {
      Toast({
        title: "Password Mismatch ⚠️",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(res.user, { displayName: formData.name });

      // 🔥 SAVE USER ROLE TO FIRESTORE
      await setDoc(doc(db, "users", res.user.uid), {
        name: formData.name,
        email: formData.email,
        role: role, // 👈 IMPORTANT: Save selected role
        createdAt: new Date().toISOString(),
      });

      Toast({
        title: "Account Created 🎉",
        description: `Welcome to MindEase Campus as a ${role}!`,
      });

      setTimeout(() => setLocation("/login"), 1200);
    } catch (err: any) {
      Toast({
        title: "Registration Failed ❌",
        description: err.message.includes("email-already-in-use")
          ? "This email is already registered."
          : err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center overflow-hidden">
      {/* 🌗 Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* 🌈 Animated Background */}
      <section className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-green-300/20 to-blue-400/20 blur-3xl rounded-full -top-32 -left-40 animate-float-slow"></div>
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-pink-400/20 to-purple-400/20 blur-3xl rounded-full bottom-0 right-0 animate-float-slower"></div>
      </section>

      {/* 🪄 Register Card */}
      <Card className="relative z-10 w-full max-w-lg border-2 backdrop-blur-xl bg-card/90 shadow-xl rounded-2xl animate-fade-in-up">
        <CardHeader className="text-center space-y-4 py-10">
          <Badge variant="secondary" className="mx-auto mb-2">
            Register
          </Badge>

          <div className="flex justify-center items-center gap-2">
            <Heart
              className="h-7 w-7 text-primary animate-pulse"
              fill="currentColor"
            />
            <span className="font-accent text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MindEase
            </span>
          </div>

          <CardTitle className="text-2xl font-semibold mt-3">
            Join MindEase Campus
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create your account to start your wellness journey
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

          {/* 🧾 Register Form */}
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="text-sm font-semibold text-foreground">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full mt-1 p-3 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary/40 outline-none transition-all shadow-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-foreground">
                Email
              </label>
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

            {/* Role Selector */}
            <div>
              <label className="text-sm font-semibold text-foreground">
                Select Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mt-1 p-3 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary/40 outline-none transition-all shadow-sm"
              >
                <option value="user">Student/User</option>
                <option value="student">Student</option>
                <option value="institute">Institute</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-foreground">
                Password
              </label>

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
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-semibold text-foreground">
                Confirm Password
              </label>
              <input
                name="confirm"
                type="password"
                value={formData.confirm}
                onChange={handleChange}
                required
                placeholder="Re-enter password"
                className="w-full mt-1 p-3 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary/40 outline-none transition-all shadow-sm"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-lg rounded-full font-semibold bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="h-5 w-5" />
              {loading ? "Creating Account..." : "Register"}
            </Button>

            {/* Login Redirect */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary font-semibold hover:underline"
              >
                Log In
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
