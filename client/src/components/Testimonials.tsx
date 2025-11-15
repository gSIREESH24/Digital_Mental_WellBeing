import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Computer Science Major",
    avatar: "SM",
    rating: 5,
    text: "MindEase helped me through exam stress like nothing else. The AI chat was there at 3 AM when I needed it most.",
  },
  {
    name: "Alex K.",
    role: "Business Student",
    avatar: "AK",
    rating: 5,
    text: "Finally, a mental health platform that doesn't feel clinical. It's like having a supportive friend available anytime.",
  },
  {
    name: "Priya R.",
    role: "Psychology Major",
    avatar: "PR",
    rating: 5,
    text: "The mood tracking feature helped me recognize patterns I never noticed before. It's been life-changing.",
  },
  {
    name: "Jordan T.",
    role: "Engineering Student",
    avatar: "JT",
    rating: 5,
    text: "Anonymous peer support was exactly what I needed. Knowing others face similar challenges made all the difference.",
  },
  {
    name: "Maya L.",
    role: "Arts Student",
    avatar: "ML",
    rating: 5,
    text: "Booking counselling sessions was so simple. The platform respects privacy while making help accessible.",
  },
  {
    name: "Chris D.",
    role: "Medical Student",
    avatar: "CD",
    rating: 5,
    text: "The resources are evidence-based and actually helpful. This isn't just another app—it genuinely cares.",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 3));
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 3 < 0 ? testimonials.length - 3 : prev - 3));
  };

  useEffect(() => {
    const timer = setInterval(() => next(), 8000);
    return () => clearInterval(timer);
  }, []);

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
      {/* ✨ Decorative background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <Badge className="mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> Student Stories
          </Badge>
          <h2 className="font-accent text-3xl md:text-4xl lg:text-5xl font-bold">
            Hear From Our Community 💬
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from students who found strength, balance, and support through MindEase Campus.
          </p>
        </div>

        {/* Animated Testimonials Grid */}
        <div className="relative overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.3 },
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
            >
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Card className="border-2 rounded-2xl bg-card/60 backdrop-blur-lg hover:shadow-xl transition-all duration-500">
                    <CardContent className="pt-8 pb-6 px-6 space-y-4">
                      {/* Stars */}
                      <div className="flex gap-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-primary text-primary drop-shadow" />
                        ))}
                      </div>

                      {/* Text */}
                      <p className="text-muted-foreground italic leading-relaxed min-h-[100px] text-base">
                        “{testimonial.text}”
                      </p>

                      {/* User Info */}
                      <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                        <Avatar className="ring-2 ring-primary/30 shadow-md">
                          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                            {testimonial.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 mt-8">
          <Button
            variant="outline"
            onClick={prev}
            className="rounded-full p-3 hover:bg-primary/10 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            onClick={next}
            className="rounded-full p-3 hover:bg-primary/10 transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* 🏷️ Styled Badge Component (kept same theme) */
function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-secondary/60 backdrop-blur-sm text-secondary-foreground ${className}`}
    >
      {children}
    </span>
  );
}
