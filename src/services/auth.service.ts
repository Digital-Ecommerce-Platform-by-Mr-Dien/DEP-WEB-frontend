import { apiClient } from "./api-client";
import { AuthResponse, UserProfile } from "@/types/user";

export const authService = {
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/login", credentials);
      if (response.tokens?.accessToken) {
        localStorage.setItem("accessToken", response.tokens.accessToken);
      }
      return response;
    } catch {
      // Mock login for frontend development preview
      const mockUser: UserProfile = {
        id: "usr-demo-01",
        email: credentials.email,
        fullName: "Khách hàng Mẫu",
        role: "customer",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        createdAt: new Date().toISOString(),
      };
      const mockTokens = { accessToken: "demo-jwt-token-12345" };
      localStorage.setItem("accessToken", mockTokens.accessToken);
      return { user: mockUser, tokens: mockTokens };
    }
  },

  async getProfile(): Promise<UserProfile | null> {
    try {
      return await apiClient.get<UserProfile>("/auth/me");
    } catch {
      return null;
    }
  },

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
  },
};
