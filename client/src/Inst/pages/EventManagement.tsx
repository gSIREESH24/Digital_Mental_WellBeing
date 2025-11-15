import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import EventCard from "@/Inst/components/EventCard";
import { Button } from "@/Inst/components/ui/button";
import { Input } from "@/Inst/components/ui/input";
import { Textarea } from "@/Inst/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Inst/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Inst/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Inst/components/ui/select";
import ImageUpload from "@/Inst/components/ImageUpload";
import { useToast } from "@/Inst/hooks/use-toast";
import { Plus, Calendar } from "lucide-react";

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  speaker: z.string().min(2, "Speaker name is required"),
  venue: z.string().min(2, "Venue is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  type: z.enum(['workshop', 'seminar', 'group-session', 'webinar']),
  coverImage: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

//todo: remove mock functionality
const mockEvents: Array<{
  id: string;
  title: string;
  description: string;
  counsellorName: string;
  date: string;
  time: string;
  location: string;
  type: 'workshop' | 'seminar' | 'group-session' | 'webinar';
}> = [
  {
    id: '1',
    title: 'Stress Management Workshop',
    description: 'Learn effective techniques to manage exam stress and improve mental well-being during academic challenges.',
    counsellorName: 'Dr. Priya Singh',
    date: 'March 15, 2024',
    time: '3:00 PM - 5:00 PM',
    location: 'Student Center, Room 204',
    type: 'workshop',
  },
  {
    id: '2',
    title: 'Mindfulness & Meditation Session',
    description: 'Group meditation and mindfulness practice to reduce anxiety and improve focus.',
    counsellorName: 'Dr. Rajesh Kumar',
    date: 'March 18, 2024',
    time: '4:00 PM - 5:30 PM',
    location: 'Wellness Center',
    type: 'group-session',
  },
];

export default function EventManagement() {
  const [events, setEvents] = useState(mockEvents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      speaker: "",
      venue: "",
      date: "",
      time: "",
      type: "workshop",
      coverImage: "",
    },
  });

  const onSubmit = (data: EventFormData) => {
    console.log('Event data:', data);
    
    const newEvent = {
      id: String(events.length + 1),
      title: data.title,
      description: data.description,
      counsellorName: data.speaker,
      date: data.date,
      time: data.time,
      location: data.venue,
      type: data.type,
    };
    
    setEvents([...events, newEvent]);
    
    toast({
      title: "Event Created",
      description: `${data.title} has been added successfully.`,
    });
    
    setDialogOpen(false);
    form.reset();
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold" data-testid="text-page-title">Event Management</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage counselling events and workshops
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} data-testid="button-add-event" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="p-6 rounded-lg bg-card border border-card-border">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-md bg-primary/10">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold" data-testid="text-event-count">{events.length}</p>
            <p className="text-sm text-muted-foreground">Total Events</p>
          </div>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No events yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first event to start engaging students.
          </p>
          <Button onClick={() => setDialogOpen(true)} data-testid="button-add-first-event">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Event
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-add-event">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Add a new counselling event or workshop
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        label="Event Cover Image (Optional)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Stress Management Workshop" {...field} data-testid="input-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what the event is about..."
                        className="min-h-24"
                        {...field}
                        data-testid="input-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="speaker"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speaker/Counsellor</FormLabel>
                      <FormControl>
                        <Input placeholder="Dr. John Doe" {...field} data-testid="input-speaker" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="seminar">Seminar</SelectItem>
                          <SelectItem value="group-session">Group Session</SelectItem>
                          <SelectItem value="webinar">Webinar</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue/Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Student Center, Room 204" {...field} data-testid="input-venue" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} data-testid="input-date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input placeholder="3:00 PM - 5:00 PM" {...field} data-testid="input-time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-submit">
                  Create Event
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
