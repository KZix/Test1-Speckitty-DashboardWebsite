export type AttendanceStatus = 'present' | 'absent' | null;

export type AttendanceRecord = {
  user_id: string;
  status: AttendanceStatus;
};

export type AttendanceMember = {
  user_id: string;
  name: string;
  email: string;
  status: AttendanceStatus;
  updated_at: string | null;
};
