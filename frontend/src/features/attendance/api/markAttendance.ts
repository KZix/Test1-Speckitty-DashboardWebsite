import { apiClient } from '@/lib/api-client';
import type { AttendanceRecord } from '../types';

export type MarkAttendanceDTO = {
  event_id: string;
  attendances: AttendanceRecord[];
};

export const markAttendance = async (data: MarkAttendanceDTO): Promise<void> => {
  await apiClient.post('/attendance', data);
};
