import { apiClient } from '@/lib/api-client';

export const deleteInstrument = async (id: string): Promise<void> => {
  await apiClient.delete(`/instruments/${id}`);
};
