import { apiClient } from '@/lib/api-client';
import type { Instrument } from '../types';

export type CreateInstrumentDTO = {
  name: string;
  type: string;
  brand: string;
  serial_number: string;
  status?: string;
  image?: File | null;
};

export const createInstrument = async (data: CreateInstrumentDTO): Promise<Instrument> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('type', data.type);
  formData.append('brand', data.brand);
  formData.append('serial_number', data.serial_number);
  if (data.status) formData.append('status', data.status);
  if (data.image) formData.append('image', data.image);

  const response = await apiClient.post('/instruments', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};
