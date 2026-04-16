import { apiClient } from '@/lib/api-client';
import type { Instrument, InstrumentStatus } from '../types';

export type UpdateInstrumentStatusDTO = {
  id: string;
  status: InstrumentStatus;
  borrower_id?: string | null;
};

export const updateInstrumentStatus = async ({
  id,
  ...data
}: UpdateInstrumentStatusDTO): Promise<Instrument> => {
  const response = await apiClient.patch(`/instruments/${id}`, data);
  return response.data.data;
};
