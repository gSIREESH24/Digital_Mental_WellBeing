import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Inst/components/ui/card";
import { Badge } from "@/Inst/components/ui/badge";
import { Button } from "@/Inst/components/ui/button";
import { X } from "lucide-react";

interface TimeSlot {
  day: string;
  slots: string[];
}

interface AvailabilitySchedulerProps {
  value?: TimeSlot[];
  onChange?: (slots: TimeSlot[]) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '1:00 PM - 2:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
  '5:00 PM - 6:00 PM',
];

export default function AvailabilityScheduler({ value = [], onChange }: AvailabilitySchedulerProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const getDaySlots = (day: string) => {
    return value.find(slot => slot.day === day)?.slots || [];
  };

  const toggleTimeSlot = (day: string, timeSlot: string) => {
    const daySlots = getDaySlots(day);
    const newSlots = [...value];
    const dayIndex = newSlots.findIndex(s => s.day === day);

    if (daySlots.includes(timeSlot)) {
      // Remove slot
      const updatedSlots = daySlots.filter(s => s !== timeSlot);
      if (updatedSlots.length === 0) {
        newSlots.splice(dayIndex, 1);
      } else {
        newSlots[dayIndex] = { day, slots: updatedSlots };
      }
    } else {
      // Add slot
      if (dayIndex >= 0) {
        newSlots[dayIndex] = { day, slots: [...daySlots, timeSlot] };
      } else {
        newSlots.push({ day, slots: [timeSlot] });
      }
    }

    onChange?.(newSlots);
  };

  const removeSlot = (day: string, timeSlot: string) => {
    toggleTimeSlot(day, timeSlot);
  };

  return (
    <Card data-testid="availability-scheduler">
      <CardHeader>
        <CardTitle className="text-base">Weekly Availability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DAYS.map(day => (
            <Button
              key={day}
              variant={selectedDay === day ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDay(selectedDay === day ? null : day)}
              data-testid={`button-day-${day.toLowerCase()}`}
              className="toggle-elevate"
              data-state={selectedDay === day ? "on" : "off"}
            >
              {day.slice(0, 3)}
              {getDaySlots(day).length > 0 && (
                <Badge variant="secondary" className="ml-1.5 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {getDaySlots(day).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {selectedDay && (
          <div className="space-y-3 p-4 rounded-md bg-muted/30">
            <p className="text-sm font-medium">Select time slots for {selectedDay}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TIME_SLOTS.map(timeSlot => {
                const isSelected = getDaySlots(selectedDay).includes(timeSlot);
                return (
                  <Button
                    key={timeSlot}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTimeSlot(selectedDay, timeSlot)}
                    data-testid={`button-timeslot-${timeSlot.replace(/\s/g, '-')}`}
                    className="justify-start text-xs toggle-elevate"
                    data-state={isSelected ? "on" : "off"}
                  >
                    {timeSlot}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {value.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Selected Availability:</p>
            <div className="flex flex-wrap gap-2">
              {value.map(({ day, slots }) =>
                slots.map(slot => (
                  <Badge
                    key={`${day}-${slot}`}
                    variant="secondary"
                    className="gap-1 pr-1"
                    data-testid={`badge-slot-${day}-${slot}`}
                  >
                    {day.slice(0, 3)} {slot}
                    <button
                      onClick={() => removeSlot(day, slot)}
                      className="ml-1 rounded-sm hover-elevate p-0.5"
                      data-testid={`button-remove-${day}-${slot}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
