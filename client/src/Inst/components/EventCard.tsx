import { Card, CardContent, CardHeader } from "@/Inst/components/ui/card";
import { Badge } from "@/Inst/components/ui/badge";
import { Calendar, Clock, MapPin, User } from "lucide-react";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    counsellorName: string;
    date: string;
    time: string;
    location: string;
    type: 'workshop' | 'seminar' | 'group-session' | 'webinar';
  };
}

export default function EventCard({ event }: EventCardProps) {
  const typeColors = {
    workshop: 'bg-primary/10 text-primary border-primary/20',
    seminar: 'bg-chart-2/10 text-chart-2 border-chart-2/20',
    'group-session': 'bg-chart-3/10 text-chart-3 border-chart-3/20',
    webinar: 'bg-chart-4/10 text-chart-4 border-chart-4/20',
  };

  const typeLabels = {
    workshop: 'Workshop',
    seminar: 'Seminar',
    'group-session': 'Group Session',
    webinar: 'Webinar',
  };

  return (
    <Card className="hover-elevate" data-testid={`card-event-${event.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base flex-1" data-testid={`text-title-${event.id}`}>
            {event.title}
          </h3>
          <Badge variant="outline" className={typeColors[event.type]}>
            {typeLabels[event.type]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-desc-${event.id}`}>
          {event.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">By</span>
            <span className="font-medium" data-testid={`text-counsellor-${event.id}`}>{event.counsellorName}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium" data-testid={`text-date-${event.id}`}>{event.date}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium" data-testid={`text-time-${event.id}`}>{event.time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium" data-testid={`text-location-${event.id}`}>{event.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
