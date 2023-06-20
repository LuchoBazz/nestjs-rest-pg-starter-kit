import { BaseModel } from './base.entity';

export interface UserParams {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  terms: boolean;
  notifications: boolean;
  is_active: boolean;
  uid: string;
  role: UserRole;
  auth_provider: AuthProvider;
  auth_type: AuthType;
  dynamic_info: JSON;
  organization_client_id: string;
}

export enum UserRole {
  INTERNAL_ADMIN = 'INTERNAL_ADMIN',
  EXTERNAL_ADMIN = 'EXTERNAL_ADMIN',
  USER = 'USER',
}

export enum AuthProvider {
  EMAIL_AND_PASSWORD = 'EMAIL_AND_PASSWORD',
  FACEBOOK_AUTH = 'FACEBOOK_AUTH',
  GOOGLE_AUTH = 'GOOGLE_AUTH',
  GITHUB_AUTH = 'GITHUB_AUTH',
}

export enum AuthType {
  FIREBASE = 'FIREBASE',
  SUPABASE = 'SUPABASE',
}

export class UserEntity extends BaseModel {
  private _username: string;
  private _first_name: string;
  private _last_name: string;
  private _email: string;
  private _terms: boolean;
  private _notifications: boolean;
  private _is_active: boolean;
  private _uid: string;
  private _role: UserRole;
  private _auth_provider: AuthProvider;
  private _auth_type: AuthType;
  private _dynamic_info: JSON;
  private _organization_client_id: string;

  constructor(params: UserParams) {
    super();
    this._username = params.username;
    this._first_name = params.first_name;
    this._last_name = params.last_name;
    this._email = params.email;
    this._terms = params.terms;
    this._notifications = params.notifications;
    this._is_active = params.is_active;
    this._uid = params.uid;
    this._role = params.role;
    this._auth_provider = params.auth_provider;
    this._auth_type = params.auth_type;
    this._dynamic_info = params.dynamic_info;
    this._organization_client_id = params.organization_client_id;
  }

  public static load(params: UserParams): UserEntity {
    return new UserEntity(params);
  }

  // deno-lint-ignore no-explicit-any
  public loadFromRow(row: any): UserEntity {
    return UserEntity.load({
      username: row.user_username,
      first_name: row.user_first_name,
      last_name: row.user_last_name,
      email: row.user_email,
      terms: row.user_terms,
      notifications: row.user_notifications,
      is_active: row.user_is_active,
      uid: row.user_uid,
      role: row.user_role,
      auth_provider: row.user_auth_provider,
      auth_type: row.user_auth_type,
      dynamic_info: row.user_dynamic_info,
      organization_client_id: row.user_organization_client_id,
    });
  }

  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

  public get first_name(): string {
    return this._first_name;
  }

  public set first_name(value: string) {
    this._first_name = value;
  }

  public get last_name(): string {
    return this._last_name;
  }

  public set last_name(value: string) {
    this._last_name = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get terms(): boolean {
    return this._terms;
  }

  public set terms(value: boolean) {
    this._terms = value;
  }

  public get notifications(): boolean {
    return this._notifications;
  }

  public set notifications(value: boolean) {
    this._notifications = value;
  }

  public get is_active(): boolean {
    return this._is_active;
  }

  public set is_active(value: boolean) {
    this._is_active = value;
  }

  public get uid(): string {
    return this._uid;
  }

  public set uid(value: string) {
    this._uid = value;
  }

  public get role(): UserRole {
    return this._role;
  }

  public set role(value: UserRole) {
    this._role = value;
  }

  public get auth_provider(): AuthProvider {
    return this._auth_provider;
  }

  public set auth_provider(value: AuthProvider) {
    this._auth_provider = value;
  }

  public get auth_type(): AuthType {
    return this._auth_type;
  }

  public set auth_type(value: AuthType) {
    this._auth_type = value;
  }

  public get dynamic_info(): JSON {
    return this._dynamic_info;
  }

  public set dynamic_info(value: JSON) {
    this._dynamic_info = value;
  }

  public get organization_client_id(): string {
    return this._organization_client_id;
  }

  public set organization_client_id(value: string) {
    this._organization_client_id = value;
  }
}
