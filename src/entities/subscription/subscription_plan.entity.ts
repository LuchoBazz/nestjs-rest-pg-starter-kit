import { BaseModel } from '../base.entity';

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

  constructor(
    id: string,
    name: string,
    product_id: string,
    variants: string[],
    slug: string,
    description: string,
    node_quota: number,
    features: any[],
    most_popular: boolean,
    tier: number,
    is_active: boolean,
    organization_client_id: string,
  ) {
    super(id);
    this.name = name;
    this.product_id = product_id;
    this.variants = variants;
    this.slug = slug;
    this.description = description;
    this.node_quota = node_quota;
    this.features = features;
    this.most_popular = most_popular;
    this.tier = tier;
    this.is_active = is_active;
    this.organization_client_id = organization_client_id;
  }

  public static loadFromRow(row: any): SubscriptionPlanEntity {
    return new SubscriptionPlanEntity(
      row.subscription_plan_id,
      row.subscription_plan_name,
      row.subscription_plan_product_id,
      row.subscription_plan_variants,
      row.subscription_plan_slug,
      row.subscription_plan_description,
      row.subscription_plan_node_quota,
      row.subscription_plan_features,
      row.subscription_plan_most_popular,
      row.subscription_plan_tier,
      row.subscription_plan_is_active,
      row.subscription_plan_organization,
    );
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
