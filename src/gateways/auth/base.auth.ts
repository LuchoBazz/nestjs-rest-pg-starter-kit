export interface ValidateTokenPayload {
  clientId: string;
  accessToken: string;
  email?: string;
}

export interface DeleteUserPayload {
  clientId: string;
  uid: string;
}

export interface AuthGatewayUser {
  uid: string;
  email: string;
}

export abstract class BaseAuthService {
  public abstract validateToken(payload: ValidateTokenPayload): Promise<AuthGatewayUser>;
  public abstract deleteUser(payload: DeleteUserPayload): Promise<boolean>;
}
