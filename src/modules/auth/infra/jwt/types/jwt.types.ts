export interface AccountTokenPayload {
  sub: string;
  name: string;
  email: string;
  avatar: string | null;
  userId: string;
  plan: string;
  createdAt: Date;
  iat?: number;
  exp?: number;
}
