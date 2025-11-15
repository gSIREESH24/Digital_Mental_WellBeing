import { Card, CardContent, CardFooter, CardHeader } from "@/Inst/components/ui/card";
import { Button } from "@/Inst/components/ui/button";
import { Badge } from "@/Inst/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/Inst/components/ui/avatar";
import { Video, Users, MessageCircle, Calendar, Clock } from "lucide-react";

interface CounsellorProfileCardProps {
  counsellor: {
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
  };
  onBook?: (id: string) => void;
  onWhatsApp?: (number: string) => void;
}

export default function CounsellorProfileCard({ counsellor, onBook, onWhatsApp }: CounsellorProfileCardProps) {
  const initials = counsellor.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="hover-elevate" data-testid={`card-counsellor-profile-${counsellor.id}`}>
      <CardHeader className="pb-3">
        <div className="flex flex-col items-center text-center gap-3">
          <Avatar className="h-20 w-20">
            <AvatarImage src={counsellor.avatarUrl} alt={counsellor.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl">{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg" data-testid={`text-name-${counsellor.id}`}>
              {counsellor.name}
            </h3>
            <p className="text-sm text-muted-foreground" data-testid={`text-qual-${counsellor.id}`}>
              {counsellor.qualifications}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-4">
        <p className="text-sm text-center leading-relaxed" data-testid={`text-bio-${counsellor.id}`}>
          {counsellor.bio}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Next Available:</span>
            <span className="font-medium">{counsellor.nextAvailable}</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-center text-muted-foreground">Available Sessions:</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {counsellor.sessionTypes.videoCall && (
              <Badge variant="secondary" className="gap-1">
                <Video className="h-3 w-3" />
                Video Call
              </Badge>
            )}
            {counsellor.sessionTypes.inPerson && (
              <Badge variant="secondary" className="gap-1">
                <Users className="h-3 w-3" />
                In-Person
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-center text-muted-foreground">Weekly Schedule:</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {counsellor.availability.map((day, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {day}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button 
          className="w-full gap-2"
          onClick={() => onBook?.(counsellor.id)}
          data-testid={`button-book-${counsellor.id}`}
        >
          <Calendar className="h-4 w-4" />
          Book Now
        </Button>
        {counsellor.sessionTypes.emergencyWhatsApp && counsellor.sessionTypes.whatsappNumber && (
          <Button 
            variant="outline"
            className="w-full gap-2"
            onClick={() => onWhatsApp?.(counsellor.sessionTypes.whatsappNumber!)}
            data-testid={`button-whatsapp-${counsellor.id}`}
          >
            <MessageCircle className="h-4 w-4" />
            Emergency WhatsApp
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
