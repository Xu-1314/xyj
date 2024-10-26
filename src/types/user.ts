export interface User {
  id: string;
  username: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  profile: {
    fullName: string;
    avatar?: string;
    phoneNumber?: string;
    specialization?: string; // For doctors
    licenseNumber?: string; // For doctors
  };
}

export interface HealthRecord {
  id: string;
  userId: string;
  date: string;
  type: 'diagnosis' | 'prescription' | 'test';
  content: Record<string, any>;
  doctorId: string;
  status: 'active' | 'archived';
}