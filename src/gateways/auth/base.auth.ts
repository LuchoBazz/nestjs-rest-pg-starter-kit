export interface ValidateTokenPayload {
  clientId: string;
  accessToken: string;
}

export interface DeleteUserPayload {
  clientId: string;
  uid: string;
}

export abstract class BaseAuthService {
  public abstract validateToken(payload: ValidateTokenPayload): Promise<any>;
  public abstract deleteUser(payload: DeleteUserPayload): Promise<boolean>;
}
