export interface ShippingAddress {
  id?: string;
  fullName: string;
  phone: string;
  street: string;
  ward?: string;
  district: string;
  city: string;
  country: string;
  isDefault?: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  phone?: string;
  role: "customer" | "admin" | "seller";
  addresses?: ShippingAddress[];
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface AuthResponse {
  user: UserProfile;
  tokens: AuthTokens;
}
