import { apiClient } from '@/lib/api-client';
import type { AttendanceMember } from '../types';

export const getAttendance = async (eventId: string): Promise<AttendanceMember[]> => {
  const response = await apiClient.get(`/attendance?event_id=${eventId}`);
  return response.data;
};
