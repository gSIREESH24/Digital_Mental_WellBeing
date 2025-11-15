import { useRoute, Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Award,
  Calendar,
  Clock,
  Languages,
  Video,
  Building,
  CheckCircle,
  GraduationCap,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { getTherapistById } from "@/data/therapists";

export default function TherapistProfile() {
  const [, params] = useRoute("/counselors/profile/:id");
  const therapistId = params?.id ? parseInt(params.id, 10) : undefined;
  const therapist = therapistId ? getTherapistById(therapistId) : undefined;

  if (!therapist) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 pt-24">
          <Card className="p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Therapist Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The therapist profile you're looking for doesn't exist.
            </p>
            <Link href="/counselors/all">
              <Button>Browse All Therapists</Button>
            </Link>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const reviewsData = [
    {
      name: "Jennifer M.",
      rating: 5,
      date: "2 weeks ago",
      comment: `${therapist.name} has been incredibly helpful in managing my anxiety. Highly professional and caring.`,
    },
    {
      name: "Robert K.",
      rating: 5,
      date: "1 month ago",
      comment:
        "Best therapist I've worked with. Really takes time to understand your concerns.",
    },
    {
      name: "Lisa P.",
      rating: 4,
      date: "2 months ago",
      comment:
        "Very knowledgeable and provides practical strategies that actually work.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Motion Wrapper for Smooth Page Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-12 pt-24"
      >
        <Card className="p-8 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Therapist Image with Hover Animation */}
            <motion.img
              src={therapist.image}
              alt={therapist.name}
              className="w-48 h-48 rounded-lg object-cover shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{therapist.name}</h1>
                  <p className="text-xl text-muted-foreground mb-2">
                    {therapist.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>{therapist.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Languages className="w-4 h-4" />
                      <span>{therapist.language.join(", ")}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-2xl">
                      {therapist.rating}
                    </span>
                    <span className="text-muted-foreground">
                      ({therapist.reviews} reviews)
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-primary">
                    ${therapist.price}
                  </p>
                  <p className="text-sm text-muted-foreground">per session</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {therapist.specializations.map((spec: string) => (
                  <motion.span
                    key={spec}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium cursor-default shadow-sm"
                  >
                    {spec}
                  </motion.span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {therapist.available === "online" && (
                  <div className="flex items-center gap-2 text-sm">
                    <Video className="w-4 h-4 text-green-600" />
                    <span>Online Sessions</span>
                  </div>
                )}
                {therapist.available === "physical" && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="w-4 h-4 text-purple-600" />
                    <span>In-Person Sessions</span>
                  </div>
                )}
                {therapist.available === "both" && (
                  <>
                    <div className="flex items-center gap-2 text-sm">
                      <Video className="w-4 h-4 text-green-600" />
                      <span>Online</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="w-4 h-4 text-purple-600" />
                      <span>In-Person</span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-3">
                <Link href={`/booking?therapist=${therapist.id}`}>
                  <Button
                    size="lg"
                    className="w-full md:w-auto transition-transform hover:scale-105"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:scale-105 transition-transform"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Free 15-min Consultation
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="about" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 sticky top-20 bg-background/95 backdrop-blur-md border-b shadow-sm z-10">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* --- All your original TabsContent retained exactly --- */}

          <TabsContent value="about">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-4">
                About {therapist.name}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {therapist.bio}
              </p>

              <h3 className="text-xl font-semibold mb-3">
                Therapeutic Approach
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {therapist.approach}
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="credentials">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              {therapist.education && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6" />
                    Education
                  </h2>
                  <ul className="space-y-2">
                    {therapist.education.map((edu: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {therapist.certifications && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6" />
                    Certifications & Licenses
                  </h2>
                  <ul className="space-y-2">
                    {therapist.certifications.map(
                      (cert: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{cert}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {therapist.insuranceAccepted && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">
                    Insurance Accepted
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {therapist.insuranceAccepted.map(
                      (insurance: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm"
                        >
                          {insurance}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="availability">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Available Hours
              </h2>
              {therapist.availability ? (
                <>
                  <ul className="space-y-3">
                    {therapist.availability.map(
                      (slot: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 p-3 bg-accent rounded-lg"
                        >
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="font-medium">{slot}</span>
                        </li>
                      )
                    )}
                  </ul>
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Availability may vary. Please book
                      an appointment to see real-time available slots.
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">
                  Please contact the therapist directly to inquire about
                  availability.
                </p>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-4">Patient Reviews</h2>
              <div className="mb-6 p-4 bg-accent rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold">
                      {therapist.rating}
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(therapist.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {therapist.reviews} reviews
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm w-12">{stars} star</span>
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400"
                              style={{
                                width: `${stars === 5 ? 75 : stars === 4 ? 20 : 5}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm w-12 text-right">
                            {stars === 5 ? 75 : stars === 4 ? 20 : 5}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {reviewsData.map((review, index) => (
                  <Card
                    key={index}
                    className="p-4 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.name}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <Footer />
    </div>
  );
}
