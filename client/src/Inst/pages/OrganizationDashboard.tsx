import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import StudentApprovalCard from "@/Inst/components/StudentApprovalCard";
import { useToast } from "@/Inst/hooks/use-toast";
import { UserCheck, Users } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";

interface StudentRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  rollNo: string;
  branch: string;
  year: string;
  reason?: string;
  status: string;
  createdAt: string;
}

export default function OrganizationDashboard() {
  const [students, setStudents] = useState<StudentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        // Get organization ID
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        const organizationId = userData?.organizationId || user.uid;

        // Query pending requests for this organization
        const requestsQuery = query(
          collection(db, "organizationRequests"),
          where("organizationId", "==", organizationId),
          where("status", "==", "pending")
        );

        // Set up real-time listener
        const unsubscribe = onSnapshot(requestsQuery, (snapshot) => {
          const requestsList: StudentRequest[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            requestsList.push({
              id: doc.id,
              studentId: data.studentId,
              studentName: data.studentName,
              studentEmail: data.studentEmail,
              rollNo: data.rollNo,
              branch: data.branch,
              year: data.year,
              reason: data.reason,
              status: data.status,
              createdAt: data.createdAt,
            });
          });
          setStudents(requestsList);
          setLoading(false);
        }, (error) => {
          console.error("Error fetching requests:", error);
          toast({
            title: "Error",
            description: "Failed to load requests. Please refresh the page.",
            variant: "destructive",
          });
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error: any) {
        console.error("Error setting up requests listener:", error);
        toast({
          title: "Error",
          description: "Failed to load requests.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchRequests();
  }, [toast]);

  const handleApprove = async (id: string) => {
    try {
      const request = students.find(s => s.id === id);
      if (!request) return;

      // Update request status
      await updateDoc(doc(db, "organizationRequests", id), {
        status: "approved",
        approvedAt: new Date().toISOString(),
      });

      // Update student's organizationId in their user document
      await updateDoc(doc(db, "users", request.studentId), {
        organizationId: auth.currentUser?.uid,
      });

      toast({
        title: "Student Approved",
        description: `${request.studentName} has been approved and can now access counselling services.`,
      });
    } catch (error: any) {
      console.error("Error approving student:", error);
      toast({
        title: "Error",
        description: "Failed to approve student. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      const request = students.find(s => s.id === id);
      if (!request) return;

      // Update request status
      await updateDoc(doc(db, "organizationRequests", id), {
        status: "rejected",
        rejectedAt: new Date().toISOString(),
      });

      toast({
        title: "Student Rejected",
        description: `${request.studentName}'s request has been rejected.`,
        variant: "destructive",
      });
    } catch (error: any) {
      console.error("Error rejecting student:", error);
      toast({
        title: "Error",
        description: "Failed to reject student. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" data-testid="text-page-title">Organization Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          Review and approve student verification requests
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-6 rounded-lg bg-card border border-card-border">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-md bg-primary/10">
              <UserCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold" data-testid="text-pending-count">{students.length}</p>
              <p className="text-sm text-muted-foreground">Pending Approvals</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-card border border-card-border">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-md bg-chart-2/10">
              <Users className="h-6 w-6 text-chart-2" />
            </div>
            <div>
              <p className="text-2xl font-bold">48</p>
              <p className="text-sm text-muted-foreground">Approved Students</p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading requests...</p>
        </div>
      ) : students.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <UserCheck className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
          <p className="text-muted-foreground">
            No pending student verification requests at the moment.
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Pending Verification Requests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map(student => (
              <StudentApprovalCard
                key={student.id}
                student={{
                  id: student.id,
                  name: student.studentName,
                  email: student.studentEmail,
                  rollNo: student.rollNo,
                  branch: student.branch,
                  year: parseInt(student.year) || 1,
                  age: 0, // Age not in request data
                }}
                onApprove={handleApprove}
                onReject={handleReject}
                onClick={(id) => setLocation(`/students/${id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
