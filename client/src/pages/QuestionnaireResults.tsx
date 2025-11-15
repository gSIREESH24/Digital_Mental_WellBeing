import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Star, CheckCircle, Sparkles } from "lucide-react";
import { getMatchedTherapists } from "@/data/therapists";

const matchReasons = [
  "Matches your preference for online sessions, has expertise in anxiety management, and speaks your preferred language.",
  "Offers both online and in-person options, and has extensive experience with the concerns you mentioned.",
  "Specializes in trauma-related concerns and matches your age and language preferences.",
];

const matchScores = [98, 95, 92];

export default function QuestionnaireResults() {
  const matchedTherapists = getMatchedTherapists().map((therapist, index) => ({
    ...therapist,
    matchScore: matchScores[index],
    whyMatched: matchReasons[index],
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12 pt-24 max-w-6xl">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">We Found Your Perfect Matches!</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on your responses, we've carefully matched you with these certified therapists who specialize in your areas of concern.
          </p>
        </div>

        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2 border-blue-200 dark:border-blue-800 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-2">Your Personalized Matches</h2>
              <p className="text-muted-foreground">
                We analyzed your preferences, concerns, and requirements to find therapists who are best suited to help you. Each therapist is licensed, experienced, and ready to support your mental health journey.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          {matchedTherapists.map((therapist, index) => (
            <Card key={therapist.id} className="p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden" style={{ animationDelay: `${index * 150}ms` }}>
              {index === 0 && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Best Match
                </div>
              )}
              
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold">{therapist.name}</h2>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                          {therapist.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-1">{therapist.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {therapist.experience} experience • {therapist.language.join(", ")}
                      </p>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <div className="flex items-center gap-1 justify-end mb-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-lg">{therapist.rating}</span>
                        <span className="text-sm text-muted-foreground">({therapist.reviews})</span>
                      </div>
                      <p className="text-2xl font-bold text-primary">${therapist.price}</p>
                      <p className="text-xs text-muted-foreground">per session</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-3">{therapist.description}</p>

                  <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg mb-4">
                    <p className="text-sm">
                      <strong className="text-blue-700 dark:text-blue-300">Why we matched you:</strong>{" "}
                      <span className="text-muted-foreground">{therapist.whyMatched}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {therapist.specializations.map((spec) => (
                      <span
                        key={spec}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/counselors/profile/${therapist.id}`}>
                      <Button variant="outline">View Full Profile</Button>
                    </Link>
                    <Link href={`/booking?therapist=${therapist.id}`}>
                      <Button>Book Appointment</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Not sure yet? Browse all our certified therapists
          </p>
          <Link href="/counselors/all">
            <Button variant="outline" size="lg">
              View All Therapists
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
