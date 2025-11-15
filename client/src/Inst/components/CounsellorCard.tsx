import { Card, CardContent, CardFooter, CardHeader } from "@/Inst/components/ui/card";
import { Button } from "@/Inst/components/ui/button";
import { Badge } from "@/Inst/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/Inst/components/ui/avatar";
import { Edit, Trash2, Video, Users, MessageCircle } from "lucide-react";

interface CounsellorCardProps {
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
    };
    availability: string[];
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function CounsellorCard({ counsellor, onEdit, onDelete }: CounsellorCardProps) {
  const initials = counsellor.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card data-testid={`card-counsellor-${counsellor.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-14 w-14">
            <AvatarImage src={counsellor.avatarUrl} alt={counsellor.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate" data-testid={`text-name-${counsellor.id}`}>
              {counsellor.name}
            </h3>
            <p className="text-sm text-muted-foreground truncate" data-testid={`text-qual-${counsellor.id}`}>
              {counsellor.qualifications}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pb-3">
        <p className="text-sm line-clamp-3" data-testid={`text-bio-${counsellor.id}`}>
          {counsellor.bio}
        </p>
        
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Session Types:</p>
          <div className="flex flex-wrap gap-1.5">
            {counsellor.sessionTypes.videoCall && (
              <Badge variant="secondary" className="gap-1 text-xs">
                <Video className="h-3 w-3 shrink-0" />
                <span className="truncate">Video Call</span>
              </Badge>
            )}
            {counsellor.sessionTypes.inPerson && (
              <Badge variant="secondary" className="gap-1 text-xs">
                <Users className="h-3 w-3 shrink-0" />
                <span className="truncate">In-Person</span>
              </Badge>
            )}
            {counsellor.sessionTypes.emergencyWhatsApp && (
              <Badge variant="secondary" className="gap-1 text-xs">
                <MessageCircle className="h-3 w-3 shrink-0" />
                <span className="truncate">WhatsApp</span>
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Available:</p>
          <div className="flex flex-wrap gap-1.5">
            {counsellor.availability.slice(0, 3).map((day, idx) => (
              <Badge key={idx} variant="outline" className="text-xs truncate">
                {day}
              </Badge>
            ))}
            {counsellor.availability.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{counsellor.availability.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2 flex-wrap">
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 gap-1.5"
          onClick={() => onEdit?.(counsellor.id)}
          data-testid={`button-edit-${counsellor.id}`}
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 gap-1.5"
          onClick={() => onDelete?.(counsellor.id)}
          data-testid={`button-delete-${counsellor.id}`}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
