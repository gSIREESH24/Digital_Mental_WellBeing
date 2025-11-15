import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Inst/components/ui/dialog";
import { Button } from "@/Inst/components/ui/button";
import { Label } from "@/Inst/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Inst/components/ui/radio-group";
import { Calendar } from "@/Inst/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/Inst/components/ui/avatar";
import { Badge } from "@/Inst/components/ui/badge";
import { Video, Users, Calendar as CalendarIcon } from "lucide-react";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  counsellor: {
    id: string;
    name: string;
    avatarUrl?: string;
    sessionTypes: {
      videoCall: boolean;
      inPerson: boolean;
    };
  };
  onConfirm?: (booking: { date: Date; sessionType: string; timeSlot: string }) => void;
}

const AVAILABLE_TIMES = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

export default function BookingModal({ open, onOpenChange, counsellor, onConfirm }: BookingModalProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sessionType, setSessionType] = useState<string>('video');
  const [timeSlot, setTimeSlot] = useState<string>('');

  const initials = counsellor.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleConfirm = () => {
    if (date && timeSlot) {
      onConfirm?.({ date, sessionType, timeSlot });
      onOpenChange(false);
      // Reset form
      setDate(new Date());
      setSessionType('video');
      setTimeSlot('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" data-testid="modal-booking">
        <DialogHeader>
          <DialogTitle>Book Counselling Session</DialogTitle>
          <DialogDescription>
            Schedule a session with {counsellor.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center gap-3 p-3 rounded-md bg-muted/30">
            <Avatar className="h-12 w-12">
              <AvatarImage src={counsellor.avatarUrl} alt={counsellor.name} />
              <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{counsellor.name}</p>
              <p className="text-sm text-muted-foreground">Professional Counsellor</p>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Session Type</Label>
            <RadioGroup value={sessionType} onValueChange={setSessionType} data-testid="radio-session-type">
              {counsellor.sessionTypes.videoCall && (
                <div className="flex items-center space-x-2 p-3 rounded-md border hover-elevate">
                  <RadioGroupItem value="video" id="video" data-testid="radio-video" />
                  <Label htmlFor="video" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Video className="h-4 w-4 text-primary" />
                    <span>Video Call</span>
                  </Label>
                </div>
              )}
              {counsellor.sessionTypes.inPerson && (
                <div className="flex items-center space-x-2 p-3 rounded-md border hover-elevate">
                  <RadioGroupItem value="in-person" id="in-person" data-testid="radio-inperson" />
                  <Label htmlFor="in-person" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span>In-Person</span>
                  </Label>
                </div>
              )}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Select Date</Label>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(date) => date < new Date() || date.getDay() === 0}
                data-testid="calendar-date"
              />
            </div>
          </div>

          {date && (
            <div className="space-y-3">
              <Label>Available Time Slots</Label>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_TIMES.map((time) => (
                  <Button
                    key={time}
                    variant={timeSlot === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeSlot(time)}
                    data-testid={`button-time-${time.replace(/\s/g, '-')}`}
                    className="toggle-elevate"
                    data-state={timeSlot === time ? "on" : "off"}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {date && timeSlot && (
            <div className="p-4 rounded-md bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-2">
                <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Booking Summary</p>
                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <p>Date: {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p>Time: {timeSlot}</p>
                    <p>Type: {sessionType === 'video' ? 'Video Call' : 'In-Person'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!date || !timeSlot}
            data-testid="button-confirm"
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
