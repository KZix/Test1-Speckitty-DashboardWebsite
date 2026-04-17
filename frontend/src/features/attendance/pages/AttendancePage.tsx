import { AttendanceTracker } from "../components/AttendanceTracker";
import { useSearchParams, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function AttendancePage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  
  const eventId = searchParams.get('eventId');
  const eventTitle = searchParams.get('eventTitle') || 'Selected Event';

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  if (!eventId) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">No Event Selected</h2>
        <p className="text-muted-foreground">Please select an event from the calendar to mark attendance.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <AttendanceTracker eventId={eventId} eventTitle={eventTitle} />
    </div>
  );
}
