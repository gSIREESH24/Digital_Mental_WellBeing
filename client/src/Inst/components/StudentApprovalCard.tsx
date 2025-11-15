import { Card, CardContent, CardFooter, CardHeader } from "@/Inst/components/ui/card";
import { Button } from "@/Inst/components/ui/button";
import { Badge } from "@/Inst/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/Inst/components/ui/avatar";
import { Mail, GraduationCap, Calendar, User } from "lucide-react";

interface StudentApprovalCardProps {
  student: {
    id: string;
    name: string;
    email: string;
    rollNo: string;
    branch: string;
    year: number;
    age: number;
    avatarUrl?: string;
  };
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onClick?: (id: string) => void;
}

export default function StudentApprovalCard({ student, onApprove, onReject, onClick }: StudentApprovalCardProps) {
  const initials = student.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card 
      className="cursor-pointer hover-elevate" 
      onClick={() => onClick?.(student.id)}
      data-testid={`card-student-${student.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={student.avatarUrl} alt={student.name} />
            <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base truncate" data-testid={`text-name-${student.id}`}>
              {student.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span className="truncate" data-testid={`text-email-${student.id}`}>{student.email}</span>
            </div>
          </div>
          <Badge variant="secondary" className="shrink-0">Pending</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pb-3">
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <User className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground shrink-0">Roll No:</span>
            <span className="font-medium truncate" data-testid={`text-rollno-${student.id}`}>{student.rollNo}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground shrink-0">Branch:</span>
            <span className="font-medium truncate" data-testid={`text-branch-${student.id}`}>{student.branch}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Year:</span>
              <span className="font-medium" data-testid={`text-year-${student.id}`}>{student.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Age:</span>
              <span className="font-medium" data-testid={`text-age-${student.id}`}>{student.age}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2 flex-wrap">
        <Button 
          variant="default" 
          className="flex-1 min-w-[120px]"
          onClick={(e) => {
            e.stopPropagation();
            onApprove?.(student.id);
          }}
          data-testid={`button-approve-${student.id}`}
        >
          Approve
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 min-w-[120px]"
          onClick={(e) => {
            e.stopPropagation();
            onReject?.(student.id);
          }}
          data-testid={`button-reject-${student.id}`}
        >
          Reject
        </Button>
      </CardFooter>
    </Card>
  );
}
