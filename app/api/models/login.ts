export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  fullName: string;
  role: Role[];
  expireTime: number;
}

interface Role {
  name: string;
  title: string;
}
