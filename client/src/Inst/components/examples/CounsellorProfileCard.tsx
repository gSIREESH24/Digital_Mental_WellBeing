import CounsellorProfileCard from '../CounsellorProfileCard';

export default function CounsellorProfileCardExample() {
  const mockCounsellor = {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    qualifications: 'PhD Clinical Psychology',
    bio: 'Specialized in cognitive behavioral therapy and mindfulness practices for students.',
    sessionTypes: {
      videoCall: true,
      inPerson: true,
      emergencyWhatsApp: true,
      whatsappNumber: '+91-9876543210',
    },
    availability: ['Mon 2-6PM', 'Wed 2-6PM', 'Fri 10AM-2PM'],
    nextAvailable: 'Tomorrow 2 PM',
  };

  return (
    <CounsellorProfileCard 
      counsellor={mockCounsellor}
      onBook={(id) => console.log('Book counsellor:', id)}
      onWhatsApp={(number) => console.log('WhatsApp:', number)}
    />
  );
}
