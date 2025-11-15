"use client"

import { useState } from "react"
import { Heart, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth, db } from "@/lib/firebase";

const authStyles = `
  .fade-in { animation: fadeIn 0.6s ease-out forwards; opacity: 0; }
  .fade-in-delayed { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
  .scale-in { animation: scaleIn 0.4s ease-out forwards; opacity: 0; }
  .card-smooth { transition: all 0.3s ease; }
  .input-focus { transition: all 0.2s ease; }
  .input-focus:focus { outline: none; border-color: #4a9d6f; box-shadow: 0 0 0 3px rgba(74,157,111,0.1); }
  .btn-primary { background: linear-gradient(135deg,#4a9d6f 0%,#3d8b62 100%); transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(74,157,111,0.2); }
  .btn-primary:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(74,157,111,0.3); }
  .btn-secondary { transition: all 0.3s ease; border: 1px solid #e8e8e8; }
  .btn-secondary:hover { border-color: #4a9d6f; background-color: rgba(74,157,111,0.05); }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px);} to { opacity: 1; transform: translateY(0);} }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.8);} to { opacity: 1; transform: scale(1);} }
`

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "error" | "success" | null; text: string }>({
    type: null,
    text: "",
  })
  const [step, setStep] = useState<"email" | "success">("email")

  const handleSendResetLink = async () => {
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address." })
      return
    }

    setLoading(true)
    setMessage({ type: null, text: "" })

    try {
      await sendPasswordResetEmail(auth, email)
      setStep("success")
    } catch (error: any) {
      console.error("Reset password error:", error)
      if (error.code === "auth/user-not-found") {
        setMessage({ type: "error", text: "No account found with this email." })
      } else if (error.code === "auth/invalid-email") {
        setMessage({ type: "error", text: "Please enter a valid email address." })
      } else {
        setMessage({ type: "error", text: "Something went wrong. Try again later." })
      }
    } finally {
      setLoading(false)
    }
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center p-2 sm:p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg relative z-10">
          <style>{authStyles}</style>
          <Card className="card-smooth fade-in border-border/50">
            <CardHeader className="space-y-2 text-center pb-6">
              <div className="flex items-center justify-center gap-2 mb-2 scale-in">
                <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-full">
                  <Heart className="w-5 sm:w-6 h-5 sm:h-6 text-white fill-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  MindEase
                </span>
              </div>
              <div className="flex justify-center mb-2 fade-in-delayed">
                <CheckCircle2 className="w-12 sm:w-16 h-12 sm:h-16 text-primary" />
              </div>
              <CardTitle className="text-lg sm:text-2xl">Reset Link Sent!</CardTitle>
              <CardDescription className="text-sm">
                We’ve sent a password reset link to your email. Check your inbox to continue.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <a href="/login">
                <Button className="w-full btn-primary py-2 text-sm sm:text-base">
                  Back to Sign In
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg relative z-10">
        <style>{authStyles}</style>
        <Card className="card-smooth fade-in border-border/50">
          <CardHeader className="space-y-2 text-center pb-4 sm:pb-6">
            <div className="flex items-center justify-center gap-2 mb-1 scale-in">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-full">
                <Heart className="w-5 sm:w-6 h-5 sm:h-6 text-white fill-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MindEase
              </span>
            </div>
            <CardTitle className="text-lg sm:text-2xl">Forgot Password?</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Enter your email and we’ll send you a link to reset your password
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-foreground">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground input-focus"
            />

            {message.text && (
              <p
                className={`text-sm ${
                  message.type === "error" ? "text-red-500" : "text-green-600"
                } fade-in`}
              >
                {message.text}
              </p>
            )}

            <Button
              onClick={handleSendResetLink}
              disabled={loading}
              className="w-full btn-primary py-2 text-sm sm:text-base fade-in"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            <a href="/">
              <Button
                variant="outline"
                className="w-full btn-secondary py-2 flex items-center justify-center gap-2 fade-in bg-transparent text-sm sm:text-base"
              >
                <ArrowLeft className="w-3 sm:w-4 h-3 sm:h-4" />
                Back to Sign In
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}