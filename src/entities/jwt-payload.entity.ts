export interface JwtPayload {
  id: string;
  uid: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  client: string;
  role: string;
  auth_provider: string;
  auth_type: string;
  iat: number;
  iss: string;
  aud: string[];
}
