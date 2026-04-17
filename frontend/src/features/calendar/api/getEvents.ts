import { apiClient } from '@/lib/api-client';
import type { CalendarEvent } from '../types';

export const getEvents = async (): Promise<CalendarEvent[]> => {
  const response = await apiClient.get('/calendar/events');
  return response.data;
};
