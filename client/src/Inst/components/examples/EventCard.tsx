import EventCard from '../EventCard';

export default function EventCardExample() {
  const mockEvent = {
    id: '1',
    title: 'Stress Management Workshop',
    description: 'Learn effective techniques to manage exam stress and improve mental well-being during academic challenges.',
    counsellorName: 'Dr. Priya Singh',
    date: 'March 15, 2024',
    time: '3:00 PM - 5:00 PM',
    location: 'Student Center, Room 204',
    type: 'workshop' as const,
  };

  return <EventCard event={mockEvent} />;
}
