import { BaseModel } from '../base.entity';

export interface SubscriptionPlanParams {
  id: string;
  name: string;
  product_id: string;
  variants: string[];
  slug: string;
  description: string;
  node_quota: number;
  features: any[];
  most_popular: boolean;
  tier: number;
  is_active: boolean;
  organization_client_id: string;
}

export class SubscriptionPlanObject {
  id: string;
  name: string;
  product_id?: string;
  variants: string[];
  slug: string;
  description: string;
  node_quota: number;
  features: string[];
  most_popular: boolean;
  tier: number;
  is_active: boolean;
  client_id: string;
}

export class SubscriptionPlanEntity extends BaseModel {
  private _name: string;
  private _product_id: string;
  private _variants: string[];
  private _slug: string;
  private _description: string;
  private _node_quota: number;
  private _features: any[];
  private _most_popular: boolean;
  private _tier: number;
  private _is_active: boolean;
  private _organization_client_id: string;

  constructor(params: SubscriptionPlanParams) {
    super(params.id);
    this.name = params.name;
    this.product_id = params.product_id;
    this.variants = params.variants;
    this.slug = params.slug;
    this.description = params.description;
    this.node_quota = params.node_quota;
    this.features = params.features;
    this.most_popular = params.most_popular;
    this.tier = params.tier;
    this.is_active = params.is_active;
    this.organization_client_id = params.organization_client_id;
  }

  public static load(params: SubscriptionPlanParams): SubscriptionPlanEntity {
    return new SubscriptionPlanEntity(params);
  }

  // deno-lint-ignore no-explicit-any
  public static loadFromRow(row: any): SubscriptionPlanEntity {
    return SubscriptionPlanEntity.load({
      id: row.subscription_plan_id,
      name: row.subscription_plan_name,
      product_id: row.subscription_plan_product_id,
      variants: row.subscription_plan_variants,
      slug: row.subscription_plan_slug,
      description: row.subscription_plan_description,
      node_quota: row.subscription_plan_node_quota,
      features: row.subscription_plan_features,
      most_popular: row.subscription_plan_most_popular,
      tier: row.subscription_plan_tier,
      is_active: row.subscription_plan_is_active,
      organization_client_id: row.subscription_plan_organization,
    });
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get product_id(): string {
    return this._product_id;
  }

  public set product_id(value: string) {
    this._product_id = value;
  }

  public get variants(): string[] {
    return this._variants;
  }

  public set variants(value: string[]) {
    this._variants = value;
  }

  public get slug(): string {
    return this._slug;
  }

  public set slug(value: string) {
    this._slug = value;
  }

  public get description(): string {
    return this._description;
  }

  public set description(value: string) {
    this._description = value;
  }

  public get node_quota(): number {
    return this._node_quota;
  }

  public set node_quota(value: number) {
    this._node_quota = value;
  }

  public get features(): any[] {
    return this._features;
  }

  public set features(value: any[]) {
    this._features = value;
  }

  public get most_popular(): boolean {
    return this._most_popular;
  }

  public set most_popular(value: boolean) {
    this._most_popular = value;
  }

  public get tier(): number {
    return this._tier;
  }

  public set tier(value: number) {
    this._tier = value;
  }

  public get is_active(): boolean {
    return this._is_active;
  }

  public set is_active(value: boolean) {
    this._is_active = value;
  }

  public get organization_client_id(): string {
    return this._organization_client_id;
  }

  public set organization_client_id(value: string) {
    this._organization_client_id = value;
  }
}
