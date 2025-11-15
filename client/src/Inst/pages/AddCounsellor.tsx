import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Inst/components/ui/card";
import { Button } from "@/Inst/components/ui/button";
import { Input } from "@/Inst/components/ui/input";
import { Textarea } from "@/Inst/components/ui/textarea";
import { Checkbox } from "@/Inst/components/ui/checkbox";
import { Label } from "@/Inst/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Inst/components/ui/form";
import AvailabilityScheduler from "@/Inst/components/AvailabilityScheduler";
import ImageUpload from "@/Inst/components/ImageUpload";
import { useToast } from "@/Inst/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";

const counsellorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  qualifications: z.string().min(2, "Qualifications are required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  avatarUrl: z.string().optional(),
  videoCall: z.boolean(),
  inPerson: z.boolean(),
  emergencyWhatsApp: z.boolean(),
  whatsappNumber: z.string().optional(),
}).refine((data) => data.videoCall || data.inPerson, {
  message: "At least one session type must be selected",
  path: ["videoCall"],
});

type CounsellorFormData = z.infer<typeof counsellorSchema>;

export default function AddCounsellor() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [availability, setAvailability] = useState<Array<{ day: string; slots: string[] }>>([]);

  const form = useForm<CounsellorFormData>({
    resolver: zodResolver(counsellorSchema),
    defaultValues: {
      name: "",
      qualifications: "",
      bio: "",
      avatarUrl: "",
      videoCall: true,
      inPerson: false,
      emergencyWhatsApp: false,
      whatsappNumber: "",
    },
  });

  const watchEmergencyWhatsApp = form.watch("emergencyWhatsApp");

  const onSubmit = async (data: CounsellorFormData) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to add a counsellor.",
          variant: "destructive",
        });
        return;
      }

      // Get user's organization ID from their user document
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();
      const organizationId = userData?.organizationId || user.uid; // Use user ID as org ID if not set

      // Save counsellor to Firebase
      const counsellorData = {
        name: data.name,
        qualifications: data.qualifications,
        bio: data.bio,
        avatarUrl: data.avatarUrl || "",
        sessionTypes: {
          videoCall: data.videoCall,
          inPerson: data.inPerson,
          emergencyWhatsApp: data.emergencyWhatsApp,
          whatsappNumber: data.whatsappNumber || "",
        },
        availability: availability,
        organizationId: organizationId,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "counsellors"), counsellorData);

      toast({
        title: "Counsellor Added",
        description: `${data.name} has been added successfully and is now visible to students.`,
      });
      
      setLocation('/manage-counsellors');
    } catch (error: any) {
      console.error('Error adding counsellor:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add counsellor. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setLocation('/manage-counsellors')}
          data-testid="button-back"
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold" data-testid="text-page-title">Add New Counsellor</h1>
          <p className="text-muted-foreground mt-1">
            Add a new counsellor to your organization
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic details about the counsellor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        label="Profile Picture"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. John Doe" {...field} data-testid="input-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="qualifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qualifications</FormLabel>
                    <FormControl>
                      <Input placeholder="PhD Clinical Psychology" {...field} data-testid="input-qualifications" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description about the counsellor's expertise and experience..."
                        className="min-h-24"
                        {...field}
                        data-testid="input-bio"
                      />
                    </FormControl>
                    <FormDescription>
                      This will be visible to students when browsing counsellors
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Types</CardTitle>
              <CardDescription>Select the types of sessions this counsellor offers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="videoCall"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-video"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">Video Call Sessions</FormLabel>
                      <FormDescription>
                        Online video consultations
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inPerson"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-inperson"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">In-Person Sessions</FormLabel>
                      <FormDescription>
                        Face-to-face consultations at campus
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emergencyWhatsApp"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-whatsapp"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none flex-1">
                      <FormLabel className="cursor-pointer">Emergency WhatsApp</FormLabel>
                      <FormDescription>
                        Emergency support via WhatsApp
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {watchEmergencyWhatsApp && (
                <FormField
                  control={form.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91-9876543210" {...field} data-testid="input-whatsapp" />
                      </FormControl>
                      <FormDescription>
                        Include country code (e.g., +91 for India)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>

          <AvailabilityScheduler
            value={availability}
            onChange={setAvailability}
          />

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation('/manage-counsellors')}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button type="submit" data-testid="button-submit">
              Add Counsellor
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
