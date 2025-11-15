import { useState, useEffect } from "react";
import CounsellorProfileCard from "@/Inst/components/CounsellorProfileCard";
import EventCard from "@/Inst/components/EventCard";
import BookingModal from "@/Inst/components/BookingModal";
import { useToast } from "@/Inst/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Inst/components/ui/tabs";
import { Calendar } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, getDoc, doc, onSnapshot } from "firebase/firestore";

const mockEvents = [
  {
    id: '1',
    title: 'Stress Management Workshop',
    description: 'Learn effective techniques to manage exam stress and improve mental well-being during academic challenges.',
    counsellorName: 'Dr. Priya Singh',
    date: 'March 15, 2024',
    time: '3:00 PM - 5:00 PM',
    location: 'Student Center, Room 204',
    type: 'workshop' as const,
  },
  {
    id: '2',
    title: 'Mindfulness & Meditation Session',
    description: 'Group meditation and mindfulness practice to reduce anxiety and improve focus.',
    counsellorName: 'Dr. Rajesh Kumar',
    date: 'March 18, 2024',
    time: '4:00 PM - 5:30 PM',
    location: 'Wellness Center',
    type: 'group-session' as const,
  },
  {
    id: '3',
    title: 'Mental Health Awareness Seminar',
    description: 'Understanding mental health, breaking stigmas, and supporting peers in distress.',
    counsellorName: 'Dr. Anjali Mehta',
    date: 'March 22, 2024',
    time: '2:00 PM - 4:00 PM',
    location: 'Main Auditorium',
    type: 'seminar' as const,
  },
];

interface Counsellor {
  id: string;
  name: string;
  qualifications: string;
  bio: string;
  avatarUrl?: string;
  sessionTypes: {
    videoCall: boolean;
    inPerson: boolean;
    emergencyWhatsApp: boolean;
    whatsappNumber?: string;
  };
  availability: string[];
  nextAvailable?: string;
}

export default function StudentView() {
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCounsellor, setSelectedCounsellor] = useState<Counsellor | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        // Get user's organization ID
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        const organizationId = userData?.organizationId || user.uid;

        // Query counsellors for this organization
        const counsellorsQuery = query(
          collection(db, "counsellors"),
          where("organizationId", "==", organizationId)
        );

        // Set up real-time listener
        const unsubscribe = onSnapshot(counsellorsQuery, (snapshot) => {
          const counsellorsList: Counsellor[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            // Format availability array
            const availability = data.availability?.map((slot: { day: string; slots: string[] }) => 
              `${slot.day} ${slot.slots.join(', ')}`
            ) || [];

            counsellorsList.push({
              id: doc.id,
              name: data.name,
              qualifications: data.qualifications,
              bio: data.bio,
              avatarUrl: data.avatarUrl,
              sessionTypes: {
                videoCall: data.sessionTypes?.videoCall || false,
                inPerson: data.sessionTypes?.inPerson || false,
                emergencyWhatsApp: data.sessionTypes?.emergencyWhatsApp || false,
                whatsappNumber: data.sessionTypes?.whatsappNumber || "",
              },
              availability: availability,
              nextAvailable: "Available soon", // You can calculate this based on availability
            });
          });
          setCounsellors(counsellorsList);
          setLoading(false);
        }, (error) => {
          console.error("Error fetching counsellors:", error);
          toast({
            title: "Error",
            description: "Failed to load counsellors. Please refresh the page.",
            variant: "destructive",
          });
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error: any) {
        console.error("Error setting up counsellors listener:", error);
        toast({
          title: "Error",
          description: "Failed to load counsellors.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchCounsellors();
  }, [toast]);

  const handleBook = (id: string) => {
    const counsellor = counsellors.find(c => c.id === id);
    if (counsellor) {
      setSelectedCounsellor(counsellor);
      setBookingModalOpen(true);
    }
  };

  const handleWhatsApp = (number: string) => {
    toast({
      title: "Opening WhatsApp",
      description: `Connecting you to ${number}...`,
    });
    console.log('WhatsApp number:', number);
  };

  const handleConfirmBooking = (booking: { date: Date; sessionType: string; timeSlot: string }) => {
    toast({
      title: "Booking Confirmed",
      description: `Your session with ${selectedCounsellor?.name} has been scheduled for ${booking.date.toLocaleDateString()} at ${booking.timeSlot}.`,
    });
    console.log('Booking confirmed:', booking);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" data-testid="text-page-title">Counselling Services</h1>
        <p className="text-muted-foreground mt-1">
          Book sessions with our professional counsellors
        </p>
      </div>

      <Tabs defaultValue="counsellors" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="counsellors" data-testid="tab-counsellors">Counsellors</TabsTrigger>
          <TabsTrigger value="events" data-testid="tab-events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="counsellors" className="space-y-6 mt-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading counsellors...</p>
            </div>
          ) : counsellors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No counsellors available yet. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {counsellors.map(counsellor => (
                <CounsellorProfileCard
                  key={counsellor.id}
                  counsellor={counsellor}
                  onBook={handleBook}
                  onWhatsApp={handleWhatsApp}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-6 mt-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Calendar className="h-5 w-5" />
            <span>Upcoming events and workshops</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedCounsellor && (
        <BookingModal
          open={bookingModalOpen}
          onOpenChange={setBookingModalOpen}
          counsellor={selectedCounsellor}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}
