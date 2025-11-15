import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, User, Star, CheckCircle2, Video, MapPin, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

const counsellors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    avatar: "SJ",
    specialization: "Anxiety & Stress Management",
    rating: 4.9,
    reviews: 127,
    experience: "8 years",
    availability: "Available Today",
    type: "Video/In-person",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    avatar: "MC",
    specialization: "Depression & Mood Disorders",
    rating: 4.8,
    reviews: 104,
    experience: "6 years",
    availability: "Available Tomorrow",
    type: "Video/In-person",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    avatar: "ER",
    specialization: "Relationships & Social Anxiety",
    rating: 5.0,
    reviews: 89,
    experience: "10 years",
    availability: "Available Today",
    type: "Video/In-person",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    avatar: "JW",
    specialization: "Academic Stress & Performance",
    rating: 4.9,
    reviews: 142,
    experience: "12 years",
    availability: "Next Week",
    type: "Video only",
  },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

export default function Booking() {
  const [selectedCounsellor, setSelectedCounsellor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [sessionType, setSessionType] = useState<"video" | "in-person" | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [, setLocation] = useLocation();

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get minimum date (today)
  const minDate = getTodayDate();

  // 🧠 Auto-select therapist from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const therapistId = params.get("therapist");
    if (therapistId) {
      setSelectedCounsellor(parseInt(therapistId, 10));
    }
  }, []);

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedCounsellor) {
      newErrors.counsellor = "Please select a counsellor";
    }
    if (!sessionType) {
      newErrors.sessionType = "Please select a session type";
    }
    if (!selectedDate) {
      newErrors.date = "Please select a date";
    } else {
      const selected = new Date(selectedDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.date = "Please select a future date";
      }
    }
    if (!selectedTime) {
      newErrors.time = "Please select a time slot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Confirm booking → Payment
  const handleConfirmBooking = () => {
    if (!validateForm()) {
      return;
    }

    const counsellor = counsellors.find((c) => c.id === selectedCounsellor);
    if (!counsellor || !sessionType || !selectedDate || !selectedTime) return;

    // Build booking details
    const bookingData = {
      counsellor: counsellor.name,
      specialization: counsellor.specialization,
      sessionType,
      date: selectedDate,
      time: selectedTime,
      duration: "50 minutes",
      price: "Free for students",
    };

    // Redirect to payment page with booking data
    const query = new URLSearchParams(bookingData).toString();
    setLocation(`/payment?${query}`);
  };

  // Clear errors when fields change
  useEffect(() => {
    if (selectedCounsellor) setErrors(prev => ({ ...prev, counsellor: "" }));
  }, [selectedCounsellor]);

  useEffect(() => {
    if (sessionType) setErrors(prev => ({ ...prev, sessionType: "" }));
  }, [sessionType]);

  useEffect(() => {
    if (selectedDate) setErrors(prev => ({ ...prev, date: "" }));
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTime) setErrors(prev => ({ ...prev, time: "" }));
  }, [selectedTime]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <section className="relative w-full py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
              <Badge variant="secondary" className="mb-2">Professional Support</Badge>
              <h1 className="font-accent text-4xl md:text-5xl lg:text-6xl font-bold" data-testid="text-booking-title">
                Book a Counselling Session
              </h1>
              <p className="text-lg text-muted-foreground">
                Connect with licensed mental health professionals who understand student life.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* ========================= Left Section ========================= */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="font-accent text-2xl font-bold mb-6">Choose Your Counsellor</h2>
                <div className="space-y-4">
                  {counsellors.map((counsellor, index) => (
                    <motion.div
                      key={counsellor.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all duration-300 border-2 hover:shadow-lg ${
                          selectedCounsellor === counsellor.id
                            ? "border-primary shadow-lg scale-[1.02]"
                            : "hover:border-primary/30"
                        }`}
                        onClick={() => setSelectedCounsellor(counsellor.id)}
                        data-testid={`card-counsellor-${counsellor.id}`}
                      >
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16 border-2 border-primary">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white text-lg font-semibold">
                              {counsellor.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {counsellor.name}
                                </h3>
                                <p className="text-sm text-primary font-medium">{counsellor.specialization}</p>
                              </div>
                              {selectedCounsellor === counsellor.id && (
                                <CheckCircle2 className="h-6 w-6 text-primary" />
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                              <span className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                {counsellor.rating} ({counsellor.reviews} reviews)
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {counsellor.experience} experience
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {counsellor.availability}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Video className="h-4 w-4 text-primary" />
                              <span className="text-muted-foreground">{counsellor.type}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    </motion.div>
                  ))}
                </div>
                {errors.counsellor && (
                  <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.counsellor}</span>
                  </div>
                )}
              </motion.div>

              {selectedCounsellor && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-accent text-xl font-bold mb-4">Select Session Type</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer border-2 transition-all hover:shadow-lg ${
                            sessionType === "video"
                              ? "border-primary shadow-lg"
                              : "hover:border-primary/30"
                          }`}
                          onClick={() => setSessionType("video")}
                        >
                          <CardContent className="pt-6 text-center">
                            <Video className="h-10 w-10 mx-auto mb-3 text-primary" />
                            <h4 className="font-semibold mb-1">Video Call</h4>
                            <p className="text-sm text-muted-foreground">From anywhere</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer border-2 transition-all hover:shadow-lg ${
                            sessionType === "in-person"
                              ? "border-primary shadow-lg"
                              : "hover:border-primary/30"
                          }`}
                          onClick={() => setSessionType("in-person")}
                        >
                          <CardContent className="pt-6 text-center">
                            <MapPin className="h-10 w-10 mx-auto mb-3 text-primary" />
                            <h4 className="font-semibold mb-1">In-Person</h4>
                            <p className="text-sm text-muted-foreground">Campus office</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                    {errors.sessionType && (
                      <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.sessionType}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-accent text-xl font-bold mb-4">Choose Date & Time</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="date">Preferred Date</Label>
                        <Input
                          id="date"
                          type="date"
                          min={minDate}
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className={`mt-2 ${errors.date ? "border-red-500" : ""}`}
                        />
                        {errors.date && (
                          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 mt-2">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.date}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <Label>Available Time Slots</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                              className="transition-all hover:scale-105 rounded-full"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                        {errors.time && (
                          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 mt-2">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.time}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* ========================= Summary ========================= */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-24 border-2 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Counsellor</p>
                        <p className="font-medium">
                          {selectedCounsellor
                            ? counsellors.find((c) => c.id === selectedCounsellor)?.name
                            : "Not selected"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pb-3 border-b">
                      {sessionType === "video" ? (
                        <Video className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Session Type</p>
                        <p className="font-medium capitalize">
                          {sessionType ? (sessionType === "video" ? "Video Call" : "In-Person") : "Not selected"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pb-3 border-b">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">
                          {selectedDate 
                            ? new Date(selectedDate).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })
                            : "Not selected"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pb-3 border-b">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">
                          {selectedTime || "Not selected"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Session Duration</span>
                      <span className="font-medium">50 minutes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Cost</span>
                      <span className="font-medium text-primary">Free for students</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 transition-all hover:scale-105 shadow-lg rounded-full"
                    size="lg"
                    disabled={!selectedCounsellor || !sessionType || !selectedDate || !selectedTime}
                    onClick={handleConfirmBooking}
                  >
                    Confirm Booking
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Your session is 100% confidential and private
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
