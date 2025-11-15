import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/Inst/components/ui/toaster";
import { TooltipProvider } from "@/Inst/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/Inst/components/ui/sidebar";
import { ThemeProvider } from "@/Inst/hooks/use-theme";
import AppSidebar from "@/Inst/components/AppSidebar";
import OrganizationDashboard from "@/Inst/pages/OrganizationDashboard";
import ManageCounsellors from "@/Inst/pages/ManageCounsellors";
import AddCounsellor from "@/Inst/pages/AddCounsellor";
import StudentView from "@/Inst/pages/StudentView";
import StudentDetail from "@/Inst/pages/StudentDetail";
import EventManagement from "@/Inst/pages/EventManagement";
import JoinOrganization from "@/Inst/pages/JoinOrganization";
import NotFound from "@/Inst/pages/not-found";

export function Router() {
  return (
    <Switch>
      <Route path="/" component={OrganizationDashboard} />
      <Route path="/manage-counsellors" component={ManageCounsellors} />
      <Route path="/add-counsellor" component={AddCounsellor} />
      <Route path="/student-view" component={StudentView} />
      <Route path="/students/:id" component={StudentDetail} />
      <Route path="/join-organization" component={JoinOrganization} />
      <Route path="/events" component={EventManagement} />
      <Route path="/signin" component={() => (
        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Sign In</h1>
          <p className="text-muted-foreground">Sign in functionality will be implemented soon.</p>
        </div>
      )} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <header className="flex items-center gap-2 p-3 border-b border-border">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                </header>
                <main className="flex-1 overflow-auto">
                  <Router />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
