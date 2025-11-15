import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Inst/components/ui/card";
import { Button } from "@/Inst/components/ui/button";
import { Input } from "@/Inst/components/ui/input";
import { Label } from "@/Inst/components/ui/label";
import { Textarea } from "@/Inst/components/ui/textarea";
import { useToast } from "@/Inst/hooks/use-toast";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, getDoc, doc } from "firebase/firestore";
import { Building2, Search, ArrowLeft } from "lucide-react";

interface Organization {
  id: string;
  name: string;
  email: string;
  description?: string;
}

export default function JoinOrganization() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [requestData, setRequestData] = useState({
    rollNo: "",
    branch: "",
    year: "",
    reason: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        // Fetch all users with role "institute"
        const usersQuery = query(
          collection(db, "users"),
          where("role", "==", "institute")
        );
        const snapshot = await getDocs(usersQuery);
        const orgs: Organization[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          orgs.push({
            id: doc.id,
            name: data.name || data.email,
            email: data.email,
            description: data.description || "",
          });
        });
        setOrganizations(orgs);
      } catch (error: any) {
        console.error("Error fetching organizations:", error);
        toast({
          title: "Error",
          description: "Failed to load organizations. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [toast]);

  const filteredOrgs = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRequestJoin = async () => {
    if (!selectedOrg) return;

    if (!requestData.rollNo || !requestData.branch || !requestData.year) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      const user = auth.currentUser;
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to request to join an organization.",
          variant: "destructive",
        });
        return;
      }

      // Get current user data
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      // Create join request
      await addDoc(collection(db, "organizationRequests"), {
        studentId: user.uid,
        studentName: userData?.name || user.email,
        studentEmail: userData?.email || user.email,
        organizationId: selectedOrg.id,
        organizationName: selectedOrg.name,
        rollNo: requestData.rollNo,
        branch: requestData.branch,
        year: requestData.year,
        reason: requestData.reason || "",
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      toast({
        title: "Request Sent",
        description: `Your request to join ${selectedOrg.name} has been sent successfully.`,
      });

      // Reset form
      setSelectedOrg(null);
      setRequestData({ rollNo: "", branch: "", year: "", reason: "" });
    } catch (error: any) {
      console.error("Error sending request:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setLocation('/student-view')}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Join Organization</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Request to join an organization to access counselling services
          </p>
        </div>
      </div>

      {!selectedOrg ? (
        <Card>
          <CardHeader>
            <CardTitle>Search Organizations</CardTitle>
            <CardDescription>
              Find and select an organization to request membership
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading organizations...</p>
              </div>
            ) : filteredOrgs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {searchQuery ? "No organizations found matching your search." : "No organizations available."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
                {filteredOrgs.map((org) => (
                  <Card
                    key={org.id}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setSelectedOrg(org)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md bg-primary/10 shrink-0">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{org.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{org.email}</p>
                          {org.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{org.description}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Request to Join {selectedOrg.name}</CardTitle>
                <CardDescription>
                  Fill in your details to request membership
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedOrg(null)}
              >
                Change
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rollNo">Roll Number *</Label>
                <Input
                  id="rollNo"
                  placeholder="CS21B1234"
                  value={requestData.rollNo}
                  onChange={(e) => setRequestData({ ...requestData, rollNo: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="branch">Branch *</Label>
                <Input
                  id="branch"
                  placeholder="Computer Science"
                  value={requestData.branch}
                  onChange={(e) => setRequestData({ ...requestData, branch: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                placeholder="3"
                min="1"
                max="5"
                value={requestData.year}
                onChange={(e) => setRequestData({ ...requestData, year: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="reason">Reason (Optional)</Label>
              <Textarea
                id="reason"
                placeholder="Why do you want to join this organization?"
                value={requestData.reason}
                onChange={(e) => setRequestData({ ...requestData, reason: e.target.value })}
                className="min-h-24"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setSelectedOrg(null)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRequestJoin}
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Request"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

