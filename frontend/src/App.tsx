import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MainShell } from "./components/layout/MainShell";
import { Navbar } from "./components/layout/Navbar";
import { LandingPage } from "./pages/LandingPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Users, Calendar, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { InventoryPage } from "./features/inventory/pages/InventoryPage";
import { CalendarPage } from "./features/calendar/pages/CalendarPage";
import { AttendancePage } from "./features/attendance/pages/AttendancePage";
import { Toaster } from "@/components/ui/toaster";

function Dashboard() {
  const stats = [
    {
      title: "Total Instruments",
      value: "42",
      description: "12 currently assigned",
      icon: Music,
      color: "text-blue-500",
    },
    {
      title: "Active Members",
      value: "156",
      description: "+4 from last month",
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Next Event",
      value: "Spring Concert",
      description: "In 3 days",
      icon: Calendar,
      color: "text-purple-500",
    },
    {
      title: "Maintenance Alerts",
      value: "3",
      description: "Requires attention",
      icon: AlertCircle,
      color: "text-red-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back to the Trovantina Management System.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                    <Music className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Instrument Assigned
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Violin #004 assigned to Maria Silva
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {i}h ago
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Rehearsals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "String Section", time: "Mon, 18:00" },
                { name: "Full Orchestra", time: "Wed, 19:30" },
                { name: "Brass Section", time: "Thu, 17:00" },
              ].map((event, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {event.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function App() {
  const { user, isLoading, login, register } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <>
                <Navbar />
                <LandingPage />
              </>
            } 
          />
          <Route 
            path="/login" 
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <>
                  <Navbar />
                  <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-muted/40 p-4">
                    <LoginForm onSubmit={login} />
                  </div>
                </>
              )
            } 
          />
          <Route 
            path="/register" 
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <>
                  <Navbar />
                  <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-muted/40 p-4">
                    <RegisterForm onSubmit={register} />
                  </div>
                </>
              )
            } 
          />

          {/* Private Routes */}
          <Route 
            path="/dashboard" 
            element={
              user ? (
                <MainShell>
                  <Dashboard />
                </MainShell>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          
          <Route 
            path="/instruments" 
            element={
              user ? (
                <MainShell>
                  <InventoryPage />
                </MainShell>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          <Route 
            path="/calendar" 
            element={
              user ? (
                <MainShell>
                  <CalendarPage />
                </MainShell>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          <Route 
            path="/attendance" 
            element={
              user ? (
                <MainShell>
                  <AttendancePage />
                </MainShell>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
