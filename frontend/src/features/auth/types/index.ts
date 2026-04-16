export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: string;
  user: User;
};
