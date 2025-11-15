"use client";

import { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase";
import { updatePassword } from "firebase/auth";

export default function SettingsPage({ onBack }: { onBack: () => void }) {
  const user = auth.currentUser;
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChangePassword = async () => {
    if (!user || !password) return;
    setSaving(true);
    try {
      await updatePassword(user, password);
      alert("Password updated successfully!");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert("Failed to update password. Try re-authenticating.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-secondary/10 to-background px-6">
      <Card className="max-w-lg w-full bg-card/90 backdrop-blur-xl border-2 rounded-2xl shadow-xl animate-fade-in-up">
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-2xl font-bold">Account Settings</CardTitle>
          <p className="text-sm text-muted-foreground">Change your password and preferences</p>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div>
            <label className="text-sm font-semibold">New Password</label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9" />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button onClick={handleChangePassword} disabled={saving}>
              {saving ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
