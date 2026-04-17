import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAttendance } from '../api/getAttendance';
import { markAttendance } from '../api/markAttendance';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Check, X, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { AttendanceStatus } from '../types';

type AttendanceTrackerProps = {
  eventId: string;
  eventTitle: string;
};

export function AttendanceTracker({ eventId, eventTitle }: AttendanceTrackerProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [localAttendance, setLocalAttendance] = useState<Record<string, AttendanceStatus>>({});

  const { data: members, isLoading, isError } = useQuery({
    queryKey: ['attendance', eventId],
    queryFn: () => getAttendance(eventId),
  });

  useEffect(() => {
    if (members) {
      const initialLocal: Record<string, AttendanceStatus> = {};
      members.forEach((m) => {
        initialLocal[m.user_id] = m.status;
      });
      setLocalAttendance(initialLocal);
    }
  }, [members]);

  const mutation = useMutation({
    mutationFn: () => markAttendance({
      event_id: eventId,
      attendances: Object.entries(localAttendance)
        .filter(([_, status]) => status !== null)
        .map(([user_id, status]) => ({ user_id, status })),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance', eventId] });
      toast({
        title: "Success",
        description: "Attendance saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save attendance.",
        variant: "destructive",
      });
    },
  });

  const toggleStatus = (userId: string, status: AttendanceStatus) => {
    setLocalAttendance(prev => ({
      ...prev,
      [userId]: prev[userId] === status ? null : status
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-destructive">
        Failed to load members for attendance.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Attendance: {eventTitle}</h2>
          <p className="text-muted-foreground">Mark presence for all association members.</p>
        </div>
        <Button 
          onClick={() => mutation.mutate()} 
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Attendance
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.map((member) => (
              <TableRow key={member.user_id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  {localAttendance[member.user_id] === 'present' && (
                    <Badge className="bg-green-500">Present</Badge>
                  )}
                  {localAttendance[member.user_id] === 'absent' && (
                    <Badge variant="destructive">Absent</Badge>
                  )}
                  {localAttendance[member.user_id] === null && (
                    <Badge variant="outline">Not Marked</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant={localAttendance[member.user_id] === 'present' ? 'default' : 'outline'}
                      size="sm"
                      className={localAttendance[member.user_id] === 'present' ? 'bg-green-500 hover:bg-green-600' : ''}
                      onClick={() => toggleStatus(member.user_id, 'present')}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={localAttendance[member.user_id] === 'absent' ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={() => toggleStatus(member.user_id, 'absent')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
