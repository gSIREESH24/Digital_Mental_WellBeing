import { useState } from "react";
import { useLocation } from "wouter";
import CounsellorCard from "@/Inst/components/CounsellorCard";
import { Button } from "@/Inst/components/ui/button";
import { useToast } from "@/Inst/hooks/use-toast";
import { Plus, Users } from "lucide-react";

//todo: remove mock functionality
const mockCounsellors = [
  {
    id: '1',
    name: 'Dr. Anjali Mehta',
    qualifications: 'M.Phil Clinical Psychology',
    bio: 'Specialized in anxiety and stress management with 8+ years of experience helping students navigate academic and personal challenges.',
    sessionTypes: {
      videoCall: true,
      inPerson: true,
      emergencyWhatsApp: true,
    },
    availability: ['Mon 9AM-5PM', 'Wed 9AM-5PM', 'Fri 9AM-5PM', 'Sat 10AM-2PM'],
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    qualifications: 'PhD Clinical Psychology',
    bio: 'Specialized in cognitive behavioral therapy and mindfulness practices for students dealing with depression and anxiety.',
    sessionTypes: {
      videoCall: true,
      inPerson: false,
      emergencyWhatsApp: true,
    },
    availability: ['Mon 2PM-6PM', 'Tue 2PM-6PM', 'Thu 2PM-6PM'],
  },
  {
    id: '3',
    name: 'Ms. Priya Singh',
    qualifications: 'MSc Counselling Psychology',
    bio: 'Expert in relationship counselling and stress management techniques. Helps students build resilience and coping mechanisms.',
    sessionTypes: {
      videoCall: true,
      inPerson: true,
      emergencyWhatsApp: false,
    },
    availability: ['Wed 10AM-4PM', 'Fri 10AM-4PM', 'Sat 9AM-1PM'],
  },
];

export default function ManageCounsellors() {
  const [counsellors, setCounsellors] = useState(mockCounsellors);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleEdit = (id: string) => {
    console.log('Edit counsellor:', id);
    toast({
      title: "Edit Counsellor",
      description: "Editing functionality will be implemented soon.",
    });
  };

  const handleDelete = (id: string) => {
    const counsellor = counsellors.find(c => c.id === id);
    setCounsellors(counsellors.filter(c => c.id !== id));
    toast({
      title: "Counsellor Removed",
      description: `${counsellor?.name} has been removed from the counsellor list.`,
      variant: "destructive",
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold" data-testid="text-page-title">Manage Counsellors</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all counsellors in your organization
          </p>
        </div>
        <Button onClick={() => setLocation('/add-counsellor')} data-testid="button-add-counsellor" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Counsellor
        </Button>
      </div>

      <div className="p-6 rounded-lg bg-card border border-card-border">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-md bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold" data-testid="text-counsellor-count">{counsellors.length}</p>
            <p className="text-sm text-muted-foreground">Active Counsellors</p>
          </div>
        </div>
      </div>

      {counsellors.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No counsellors yet</h3>
          <p className="text-muted-foreground mb-4">
            Add your first counsellor to start providing mental health support.
          </p>
          <Button onClick={() => setLocation('/add-counsellor')} data-testid="button-add-first">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Counsellor
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {counsellors.map(counsellor => (
            <CounsellorCard
              key={counsellor.id}
              counsellor={counsellor}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
