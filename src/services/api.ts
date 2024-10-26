import { LoginCredentials, AuthResponse } from '../types/auth';
import { User, HealthRecord } from '../types/user';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  private token: string | null = null;

  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.fetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.fetch<User>('/auth/me');
  }

  async getHealthRecords(userId: string): Promise<HealthRecord[]> {
    return this.fetch<HealthRecord[]>(`/health-records/${userId}`);
  }

  async uploadHealthDocument(
    userId: string,
    file: File,
    metadata: Record<string, any>
  ): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));

    return this.fetch<{ url: string }>(`/health-records/${userId}/upload`, {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    });
  }
}

export const api = new ApiService();