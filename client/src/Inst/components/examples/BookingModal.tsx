import { useState } from 'react';
import BookingModal from '../BookingModal';
import { Button } from '@/components/ui/button';

export default function BookingModalExample() {
  const [open, setOpen] = useState(true);

  const mockCounsellor = {
    id: '1',
    name: 'Dr. Sarah Johnson',
    sessionTypes: {
      videoCall: true,
      inPerson: true,
    },
  };

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Open Booking Modal</Button>
      <BookingModal
        open={open}
        onOpenChange={setOpen}
        counsellor={mockCounsellor}
        onConfirm={(booking) => {
          console.log('Booking confirmed:', booking);
        }}
      />
    </div>
  );
}
