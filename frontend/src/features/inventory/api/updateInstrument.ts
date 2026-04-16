import { apiClient } from '@/lib/api-client';
import type { Instrument } from '../types';

export type UpdateInstrumentDTO = {
  id: string;
  name?: string;
  type?: string;
  brand?: string;
  serial_number?: string;
  status?: string;
  borrower_id?: string | null;
  image?: File | null;
};

export const updateInstrument = async ({ id, ...data }: UpdateInstrumentDTO): Promise<Instrument> => {
  const formData = new FormData();
  if (data.name) formData.append('name', data.name);
  if (data.type) formData.append('type', data.type);
  if (data.brand) formData.append('brand', data.brand);
  if (data.serial_number) formData.append('serial_number', data.serial_number);
  if (data.status) formData.append('status', data.status);
  if (data.borrower_id !== undefined) formData.append('borrower_id', data.borrower_id || '');
  if (data.image) formData.append('image', data.image);
  
  // Laravel often requires _method=PUT for multipart/form-data updates via POST
  formData.append('_method', 'PUT');

  const response = await apiClient.post(`/instruments/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};
