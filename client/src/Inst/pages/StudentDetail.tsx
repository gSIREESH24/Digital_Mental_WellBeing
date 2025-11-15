import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/Inst/components/ui/card";
import { Button } from "@/Inst/components/ui/button";
import { Badge } from "@/Inst/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/Inst/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Inst/components/ui/tabs";
import { ArrowLeft, Mail, GraduationCap, Calendar, User, Phone, MapPin, CheckCircle2, Clock } from "lucide-react";

// todo: remove mock functionality - replace with real data from API
const mockStudent = {
  id: '1',
  name: 'Priya Sharma',
  email: 'priya.sharma@university.edu',
  rollNo: 'CS21B1234',
  branch: 'Computer Science',
  year: 3,
  age: 20,
  phone: '+91-9876543210',
  address: 'Hostel Block A, Room 302',
  avatarUrl: '',
  status: 'approved',
  joinedDate: 'January 15, 2024',
  sessions: [
    {
      id: '1',
      counsellor: 'Dr. Anjali Mehta',
      date: 'March 10, 2024',
      time: '2:00 PM',
      type: 'Video Call',
      status: 'completed',
      notes: 'Discussed exam stress management techniques',
    },
    {
      id: '2',
      counsellor: 'Dr. Rajesh Kumar',
      date: 'March 20, 2024',
      time: '4:00 PM',
      type: 'In-Person',
      status: 'scheduled',
      notes: '',
    },
  ],
};

export default function StudentDetail() {
  const [, setLocation] = useLocation();

  const initials = mockStudent.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setLocation('/')}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Student Details</h1>
          <p className="text-muted-foreground mt-1">
            Complete profile and counselling history
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={mockStudent.avatarUrl} alt={mockStudent.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-3xl">{initials}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold" data-testid="text-student-name">{mockStudent.name}</h2>
              <Badge variant={mockStudent.status === 'approved' ? 'default' : 'secondary'} className="mt-2">
                {mockStudent.status === 'approved' ? 'Approved' : 'Pending'}
              </Badge>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 min-w-0">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground text-xs">Email</p>
                  <p className="font-medium truncate" data-testid="text-email">{mockStudent.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground text-xs">Roll Number</p>
                  <p className="font-medium" data-testid="text-rollno">{mockStudent.rollNo}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground text-xs">Branch & Year</p>
                  <p className="font-medium" data-testid="text-branch">{mockStudent.branch} - Year {mockStudent.year}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground text-xs">Age</p>
                  <p className="font-medium" data-testid="text-age">{mockStudent.age} years</p>
                </div>
              </div>

              <div className="flex items-start gap-3 min-w-0">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground text-xs">Phone</p>
                  <p className="font-medium truncate" data-testid="text-phone">{mockStudent.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground text-xs">Address</p>
                  <p className="font-medium" data-testid="text-address">{mockStudent.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground text-xs">Joined</p>
                  <p className="font-medium" data-testid="text-joined">{mockStudent.joinedDate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sessions">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="sessions" data-testid="tab-sessions">Counselling Sessions</TabsTrigger>
                <TabsTrigger value="stats" data-testid="tab-stats">Statistics</TabsTrigger>
              </TabsList>

              <TabsContent value="sessions" className="space-y-4 mt-6">
                {mockStudent.sessions.map((session) => (
                  <Card key={session.id} data-testid={`card-session-${session.id}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold truncate" data-testid={`text-counsellor-${session.id}`}>
                              {session.counsellor}
                            </h3>
                            <Badge 
                              variant={session.status === 'completed' ? 'default' : 'secondary'}
                              className="shrink-0"
                            >
                              {session.status === 'completed' ? 'Completed' : 'Scheduled'}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span data-testid={`text-date-${session.id}`}>{session.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span data-testid={`text-time-${session.id}`}>{session.time}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">{session.type}</Badge>
                          </div>

                          {session.notes && (
                            <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-notes-${session.id}`}>
                              {session.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {mockStudent.sessions.length === 0 && (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No counselling sessions yet</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="stats" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary" data-testid="text-total-sessions">
                          {mockStudent.sessions.length}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">Total Sessions</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-chart-2" data-testid="text-completed-sessions">
                          {mockStudent.sessions.filter(s => s.status === 'completed').length}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">Completed</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-chart-3" data-testid="text-upcoming-sessions">
                          {mockStudent.sessions.filter(s => s.status === 'scheduled').length}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">Upcoming</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
