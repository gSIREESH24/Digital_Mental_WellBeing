import { useState } from 'react';
import AvailabilityScheduler from '../AvailabilityScheduler';

export default function AvailabilitySchedulerExample() {
  const [availability, setAvailability] = useState([
    { day: 'Monday', slots: ['9:00 AM - 10:00 AM', '2:00 PM - 3:00 PM'] },
    { day: 'Wednesday', slots: ['10:00 AM - 11:00 AM'] },
  ]);

  return (
    <AvailabilityScheduler 
      value={availability}
      onChange={(slots) => {
        console.log('Availability updated:', slots);
        setAvailability(slots);
      }}
    />
  );
}
