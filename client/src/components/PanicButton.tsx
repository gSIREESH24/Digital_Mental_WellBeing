import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, Phone, MessageSquare, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function PanicButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="destructive"
        size="lg"
        onClick={() => setIsOpen(true)}
        className="gap-2"
        data-testid="button-panic"
      >
        <AlertCircle className="h-5 w-5" />
        Crisis Support
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md" data-testid="dialog-crisis-support">
          <DialogHeader>
            <DialogTitle className="font-accent text-2xl flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-destructive" />
              Immediate Help Available
            </DialogTitle>
            <DialogDescription className="text-base">
              You're not alone. Help is available right now.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Card className="bg-destructive/10 border-destructive/20">
              <CardContent className="pt-6 space-y-3">
                <h3 className="font-semibold text-lg">24/7 Crisis Hotlines</h3>
                <div className="space-y-2">
                  <a
                    href="tel:988"
                    className="flex items-center gap-3 p-3 rounded-lg hover-elevate active-elevate-2 bg-background border"
                    data-testid="link-crisis-988"
                  >
                    <Phone className="h-5 w-5 text-destructive" />
                    <div>
                      <div className="font-medium">988 Suicide & Crisis Lifeline</div>
                      <div className="text-sm text-muted-foreground">Call or text 988</div>
                    </div>
                  </a>
                  <a
                    href="tel:1-800-273-8255"
                    className="flex items-center gap-3 p-3 rounded-lg hover-elevate active-elevate-2 bg-background border"
                    data-testid="link-crisis-lifeline"
                  >
                    <Phone className="h-5 w-5 text-destructive" />
                    <div>
                      <div className="font-medium">National Suicide Prevention</div>
                      <div className="text-sm text-muted-foreground">1-800-273-8255</div>
                    </div>
                  </a>
                  <a
                    href="sms:741741"
                    className="flex items-center gap-3 p-3 rounded-lg hover-elevate active-elevate-2 bg-background border"
                    data-testid="link-crisis-text"
                  >
                    <MessageSquare className="h-5 w-5 text-destructive" />
                    <div>
                      <div className="font-medium">Crisis Text Line</div>
                      <div className="text-sm text-muted-foreground">Text HOME to 741741</div>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <h3 className="font-semibold text-lg">Campus Resources</h3>
                <div className="space-y-2">
                  <button
                    className="flex items-center gap-3 p-3 rounded-lg hover-elevate active-elevate-2 bg-muted w-full text-left"
                    onClick={() => console.log("Campus security clicked")}
                    data-testid="button-campus-security"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Campus Security</div>
                      <div className="text-sm text-muted-foreground">Available 24/7</div>
                    </div>
                  </button>
                  <button
                    className="flex items-center gap-3 p-3 rounded-lg hover-elevate active-elevate-2 bg-muted w-full text-left"
                    onClick={() => console.log("Emergency counsellor clicked")}
                    data-testid="button-emergency-counsellor"
                  >
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Emergency Counsellor</div>
                      <div className="text-sm text-muted-foreground">On-call support</div>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground text-center">
              If this is a medical emergency, please call 911 or go to your nearest emergency room.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
