import CounsellorCard from '../CounsellorCard';

export default function CounsellorCardExample() {
  const mockCounsellor = {
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
  };

  return (
    <CounsellorCard 
      counsellor={mockCounsellor}
      onEdit={(id) => console.log('Edit counsellor:', id)}
      onDelete={(id) => console.log('Delete counsellor:', id)}
    />
  );
}
