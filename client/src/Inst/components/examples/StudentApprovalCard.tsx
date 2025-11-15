import StudentApprovalCard from '../StudentApprovalCard';

export default function StudentApprovalCardExample() {
  const mockStudent = {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@university.edu',
    rollNo: 'CS21B1234',
    branch: 'Computer Science',
    year: 3,
    age: 20,
  };

  return (
    <StudentApprovalCard 
      student={mockStudent}
      onApprove={(id) => console.log('Approved student:', id)}
      onReject={(id) => console.log('Rejected student:', id)}
    />
  );
}
