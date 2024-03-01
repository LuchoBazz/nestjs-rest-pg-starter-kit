import { BaseModel } from '../base.entity';
import { PhoneObject } from './phone_number.entity';

export enum UserRole {
  INTERNAL_ADMIN = 'INTERNAL_ADMIN',
  EXTERNAL_ADMIN = 'EXTERNAL_ADMIN',
  USER = 'USER',
}

export enum AuthProvider {
  FIREBASE = 'FIREBASE',
  SUPABASE = 'SUPABASE',
}

export enum AuthType {
  EMAIL_AND_PASSWORD = 'EMAIL_AND_PASSWORD',
  FACEBOOK_AUTH = 'FACEBOOK_AUTH',
  GOOGLE_AUTH = 'GOOGLE_AUTH',
  GITHUB_AUTH = 'GITHUB_AUTH',
}

export class UserObject {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  identification_number: string | null;
  phone_number: PhoneObject | null;
  terms: boolean;
  notifications: boolean;
  is_active: boolean;
  uid: string;
  role: UserRole;
  auth_provider: AuthProvider;
  auth_type: AuthType;
  organization_client_id: string;
}

export class UserEntity extends BaseModel {
  private _username: string;
  private _first_name: string;
  private _last_name: string;
  private _email: string;
  private _identification_number: string | null;
  private _phone_number: string | null;
  private _terms: boolean;
  private _notifications: boolean;
  private _is_active: boolean;
  private _uid: string;
  private _role: UserRole;
  private _auth_provider: AuthProvider;
  private _auth_type: AuthType;
  private _dynamic_info: Record<string, any>;
  private _organization_client_id: string;

  constructor(
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    identification_number: string | null,
    phone_number: string | null,
    terms: boolean,
    notifications: boolean,
    is_active: boolean,
    uid: string,
    role: UserRole,
    auth_provider: AuthProvider,
    auth_type: AuthType,
    dynamic_info: Record<string, any>,
    organization_client_id: string,
  ) {
    super();
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.identification_number = identification_number;
    this.phone_number = phone_number;
    this.terms = terms;
    this.notifications = notifications;
    this.is_active = is_active;
    this.uid = uid;
    this.role = role;
    this.auth_provider = auth_provider;
    this.auth_type = auth_type;
    this.dynamic_info = dynamic_info;
    this.organization_client_id = organization_client_id;
  }

  public static loadFromRow(row: any): UserEntity {
    return new UserEntity(
      row.user_username,
      row.user_first_name,
      row.user_last_name,
      row.user_email,
      row.user_identification_number ?? null,
      row.user_phone_number ?? null,
      row.user_terms,
      row.user_notifications,
      row.user_is_active,
      row.user_uid,
      row.user_role,
      row.user_auth_provider,
      row.user_auth_type,
      row.user_dynamic_info,
      row.user_organization,
    );
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

  public get identification_number(): string | null {
    return this._identification_number;
  }

  public set identification_number(value: string | null) {
    this._identification_number = value;
  }

  public get phone_number(): string | null {
    return this._phone_number;
  }

  public set phone_number(value: string | null) {
    this._phone_number = value;
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

  public get dynamic_info(): Record<string, any> {
    return this._dynamic_info;
  }

  public set dynamic_info(value: Record<string, any>) {
    this._dynamic_info = value;
  }

  public get organization_client_id(): string {
    return this._organization_client_id;
  }

  public set organization_client_id(value: string) {
    this._organization_client_id = value;
  }
}
