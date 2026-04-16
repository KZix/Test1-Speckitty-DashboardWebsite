import { apiClient } from '@/lib/api-client';
import type { Instrument, PaginatedResponse } from '../types';

export type GetInstrumentsOptions = {
  cursor?: string | null;
  status?: string;
  type?: string;
};

export const getInstruments = async ({
  cursor,
  status,
  type,
}: GetInstrumentsOptions): Promise<PaginatedResponse<Instrument>> => {
  const params = new URLSearchParams();
  if (cursor) params.append('cursor', cursor);
  if (status) params.append('status', status);
  if (type) params.append('type', type);

  const response = await apiClient.get(`/instruments?${params.toString()}`);
  return response.data;
};
