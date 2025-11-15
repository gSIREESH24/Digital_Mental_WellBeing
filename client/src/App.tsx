"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Providers
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

// --- USER ROUTER ---
import UserHome from "@/pages/Home";
import UserDashboard from "@/pages/Dashboard";
import UserResources from "@/pages/Resources";
import UserResourceVideos from "@/pages/ResourceVideos";
import UserResourceView from "@/pages/ResourceView";
import UserSupport from "@/pages/Support";
import UserSupportTopicView from "@/pages/SupportTopicView";
import UserBooking from "@/pages/Booking";
import UserGames from "@/pages/Games";
import UserGamePage from "@/pages/GamePage";
import CreativeTools from "@/pages/CreativeTools";
import Doodle from "@/components/creative-tools/doodle";
import Mandala from "@/components/creative-tools/mandala";
import Kaleidoscope from "@/components/creative-tools/kaleidoscope";

import { ChatBot } from "@/components/ChatBot";

import Login from "@/pages/login";
import Register from "@/pages/register";
import Forget from "@/pages/forget";

import Counselors from "@/pages/Counselors";
import Questionnaire from "@/pages/Questionnaire";
import QuestionnaireResults from "@/pages/QuestionnaireResults";
import TherapistList from "@/pages/TherapistList";
import TherapistProfile from "@/pages/TherapistProfile";

import Payment from "@/pages/payment";
import NotFound from "@/pages/not-found";

import AppSidebar from "@/Inst/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/Inst/components/ui/sidebar";
import { ThemeProvider as InstThemeProvider } from "@/Inst/hooks/use-theme";
import OrganizationDashboard from "@/Inst/pages/OrganizationDashboard";
import ManageCounsellors from "@/Inst/pages/ManageCounsellors";
import AddCounsellor from "@/Inst/pages/AddCounsellor";
import StudentView from "@/Inst/pages/StudentView";
import StudentDetail from "@/Inst/pages/StudentDetail";
import EventManagement from "@/Inst/pages/EventManagement";
import InstNotFound from "@/Inst/pages/not-found";

// Router
import { Switch, Route, useLocation } from "wouter";

// Redirect component for guests
function GuestRedirect() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation("/login");
  }, [setLocation]);
  return null;
}


function UserRouter() {
  return (
    <Switch>
      <Route path="/" component={UserHome} />
      <Route path="/home" component={UserHome} />
      <Route path="/dashboard" component={UserDashboard} />
      <Route path="/resources" component={UserResources} />
      <Route path="/resources/videos" component={UserResourceVideos} />
      <Route path="/resources/:id" component={UserResourceView} />
      <Route path="/support" component={UserSupport} />
      <Route path="/support/topic/:id" component={UserSupportTopicView} />
      <Route path="/booking" component={UserBooking} />

      {/* Games */}
      <Route path="/games" component={UserGames} />
      <Route path="/game/:name" component={UserGamePage} />

      {/* Creative Tools */}
      <Route path="/creative-tools" component={CreativeTools} />
      <Route path="/creative-tools/doodle" component={Doodle} />
      <Route path="/creative-tools/mandala" component={Mandala} />
      <Route path="/creative-tools/kaleidoscope" component={Kaleidoscope} />

      {/* Chat */}
      <Route path="/chat" component={ChatBot} />

      {/* Auth */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forget" component={Forget} />

      <Route path="/payment" component={Payment} />

      <Route path="/counselors" component={Counselors} />
      <Route path="/counselors/questionnaire" component={Questionnaire} />
      <Route path="/counselors/results" component={QuestionnaireResults} />
      <Route path="/counselors/all" component={TherapistList} />
      <Route path="/counselors/profile/:id" component={TherapistProfile} />

      <Route component={NotFound} />
    </Switch>
  );
}


// ------------------------------
// ⚡ INSTITUTE ROUTES
// ------------------------------
function InstituteRouter() {
  return( 
  <Switch>
      <Route path="/" component={OrganizationDashboard} />
      <Route path="/manage-counsellors" component={ManageCounsellors} />
      <Route path="/add-counsellor" component={AddCounsellor} />
      <Route path="/student-view" component={StudentView} />
      <Route path="/students/:id" component={StudentDetail} />
      <Route path="/events" component={EventManagement} />
      <Route path="/signin" component={() => (
        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Sign In</h1>
          <p className="text-muted-foreground">Sign in functionality will be implemented soon.</p>
        </div>
      )} />
      <Route component={InstNotFound} />
    </Switch>
  )
}


// ------------------------------
// ⚡ MAIN APP (Role Loader)
// ------------------------------
export default function App() {
  const [role, setRole] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setLoading(true); // Set loading to true when auth state changes
      if (!user) {
        setRole("guest");
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const userRole = snap.exists() ? snap.data().role : "user";
        console.log(userRole)
        setRole(userRole);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setRole("user"); // Default to user on error
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);


  // ------------------------------
  // ⏳ Show Loading
  // ------------------------------
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  // ------------------------------
  // 🧑 Guest → Show Login Router Only
  // ------------------------------
  if (role === "guest") {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/forget" component={Forget} />
              <Route path="/" component={GuestRedirect} />
              <Route component={GuestRedirect} />
            </Switch>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  // ------------------------------
  // 🧑‍🎓 USER/STUDENT ROUTER
  // 🏛️ INSTITUTE ROUTER
  // ------------------------------
  // Ensure role is not null before rendering router
  if (!role || role === null) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  const isUser = role === "user" || role === "student";
  const isInstitute = role === "institute";
  console.log(isInstitute);

  // If role is not recognized, default to user router
  const routerToShow = isInstitute ? <InstituteRouter /> : <UserRouter />;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          {isInstitute ? (
            <InstThemeProvider defaultTheme="light">
              <SidebarProvider style={{ "--sidebar-width": "16rem", "--sidebar-width-icon": "3rem" } as React.CSSProperties}>
                <div className="flex h-screen w-full">
                  <AppSidebar />
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <header className="flex items-center gap-2 p-2 sm:p-3 border-b border-border">
                      <SidebarTrigger data-testid="button-sidebar-toggle" className="shrink-0" />
                    </header>
                    <main className="flex-1 overflow-auto">
                      {routerToShow}
                    </main>
                  </div>
                </div>
              </SidebarProvider>
            </InstThemeProvider>
          ) : (
            routerToShow
          )}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
