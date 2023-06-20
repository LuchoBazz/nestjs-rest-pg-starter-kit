export interface JwtPayload {
  id: number;
  uid: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  client: string;
  role: string;
  provider: string;
  iat: number;
  iss: string;
  aud: string[];
}
