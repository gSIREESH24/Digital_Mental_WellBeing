import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Calendar, Clock, Video, User, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Payment() {
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = {
      counsellor: params.get("counsellor"),
      specialization: params.get("specialization"),
      sessionType: params.get("sessionType"),
      date: params.get("date"),
      time: params.get("time"),
      duration: params.get("duration"),
      price: params.get("price"),
    };
    setBookingDetails(data);
  }, []);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
      // Auto redirect to confirmation/dashboard after delay
      setTimeout(() => setLocation("/counselors/all"), 3500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <section className="relative py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4 text-center space-y-6 animate-fade-in-up">
            <Badge variant="secondary">Secure Checkout</Badge>
            <h1 className="font-accent text-4xl md:text-5xl font-bold">Confirm Your Booking</h1>
            <p className="text-lg text-muted-foreground">
              Review your session details and finalize your booking
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 max-w-4xl">
          {isConfirmed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center p-12 shadow-lg border-2 border-green-600/30">
                <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-600" />
                <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
                <p className="text-muted-foreground mb-6">
                  Your counselling session has been successfully scheduled.
                </p>
                <div className="flex justify-center mb-8">
                  <Card className="bg-green-50 dark:bg-green-900/20 p-6 max-w-md w-full">
                    <CardContent className="text-left space-y-3">
                      <p><strong>Counsellor:</strong> {bookingDetails?.counsellor}</p>
                      <p><strong>Date:</strong> {bookingDetails?.date}</p>
                      <p><strong>Time:</strong> {bookingDetails?.time}</p>
                      <p><strong>Session Type:</strong> {bookingDetails?.sessionType}</p>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-sm text-muted-foreground">
                  Redirecting you back to counsellor page...
                </p>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* ========================= Left Summary ========================= */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {bookingDetails ? (
                      <>
                        <div className="flex items-center gap-3 border-b pb-3">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Counsellor</p>
                            <p className="font-medium">{bookingDetails.counsellor}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 border-b pb-3">
                          <Video className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Session Type</p>
                            <p className="font-medium capitalize">{bookingDetails.sessionType}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 border-b pb-3">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p className="font-medium">{bookingDetails.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 border-b pb-3">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Time</p>
                            <p className="font-medium">{bookingDetails.time}</p>
                          </div>
                        </div>
                        <div className="flex justify-between pt-4 text-sm">
                          <span className="text-muted-foreground">Session Duration</span>
                          <span className="font-medium">{bookingDetails.duration}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Cost</span>
                          <span className="font-medium">{bookingDetails.price}</span>
                        </div>
                      </>
                    ) : (
                      <p>Loading booking details...</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <p className="font-medium">Student Portal Billing (Free Session)</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No payment required — sessions are free for students. 
                      Confirm your booking below to finalize.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* ========================= Right Summary ========================= */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 border-2 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle>Confirm & Pay</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm border-b pb-3">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-semibold text-lg text-primary">{bookingDetails?.price || "Free"}</span>
                    </div>

                    <Button
                      className="w-full mt-4 transition-all hover:scale-105 rounded-full"
                      size="lg"
                      disabled={isProcessing}
                      onClick={handlePayment}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="animate-spin h-5 w-5 mr-2" /> Processing...
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Your details are encrypted and confidential
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </section>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
