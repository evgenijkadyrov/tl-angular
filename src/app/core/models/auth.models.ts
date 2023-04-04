export interface LoginRequestType {
  email: string;
  password: string;
  rememberMe: boolean;
}
export interface AuthMeResponse {
  email: string;
  login: string;
  id: number;
}
