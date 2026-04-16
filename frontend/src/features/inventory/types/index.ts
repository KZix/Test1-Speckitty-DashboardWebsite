export type InstrumentStatus = 'available' | 'maintenance' | 'assigned';

export type Instrument = {
  id: string;
  name: string;
  type: string;
  brand: string;
  serial_number: string;
  status: InstrumentStatus;
  borrower_id: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    path: string;
    per_page: number;
    next_cursor: string | null;
    prev_cursor: string | null;
  };
};
