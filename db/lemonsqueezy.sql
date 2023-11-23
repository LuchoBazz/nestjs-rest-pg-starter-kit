CREATE TABLE IF NOT EXISTS core.users (
  user_id UUID NOT NULL,
  user_username VARCHAR(63) NOT NULL,
  user_first_name VARCHAR(63) NOT NULL,
  user_last_name VARCHAR(63) NOT NULL,
  user_email VARCHAR(63) NOT NULL,
  user_identification_number VARCHAR(63) DEFAULT NULL,
  user_phone_number VARCHAR(31) DEFAULT NULL,
  user_terms BOOLEAN NOT NULL DEFAULT FALSE,
  user_notifications BOOLEAN NOT NULL DEFAULT FALSE,
  user_is_active BOOLEAN NOT NULL DEFAULT TRUE,
  user_uid VARCHAR(255) NOT NULL,
  user_role VARCHAR(63) NOT NULL,
  user_auth_provider core."auth_provider_enum" NOT NULL,
  user_auth_type core."auth_type_enum" NOT NULL,
  user_organization VARCHAR(63) NOT NULL,
  user_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  user_updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  user_dynamic_info JSONB NOT NULL DEFAULT '{}'::JSONB,

  CONSTRAINT users_pk PRIMARY KEY (user_id),
  CONSTRAINT users_organizations_fk FOREIGN KEY (user_organization) REFERENCES core.organizations(organization_client_id),
  CONSTRAINT roles_users_fk FOREIGN KEY (user_role) REFERENCES core.roles(role_name)
);

CREATE TABLE core.subscription_plans (
    subscription_plan_id               UUID NOT NULL,
    subscription_plan_name             VARCHAR(255),
    subscription_plan_product_id       VARCHAR(255),
    subscription_plan_variants         VARCHAR[],
    subscription_plan_slug             VARCHAR(63) UNIQUE NOT NULL, -- 'FREE', 'PRO'
    subscription_plan_description      VARCHAR(255),
    -- subscription_plan_node_quota       INTEGER DEFAULT 100,
    -- subscription_plan_price_monthly    FLOAT DEFAULT 0, -- 
    -- subscription_plan_price_yearly     FLOAT DEFAULT 0, --
    -- subscription_plan_href_monthly     VARCHAR(255),    --
    -- subscription_plan_href_yearly      VARCHAR(255),    --
    subscription_plan_features         JSONB NOT NULL DEFAULT '[]'::JSONB,
    subscription_plan_most_popular     BOOLEAN DEFAULT FALSE,
    subscription_plan_tier             INTEGER DEFAULT 0,
    subscription_plan_is_active        BOOLEAN DEFAULT TRUE,
    subscription_plan_created_at       TIMESTAMPTZ DEFAULT NOW(),
    subscription_plan_updated_at       TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT subscription_plans_pk PRIMARY KEY (subscription_plan_id)
);

CREATE TABLE core.subscriptions (
    subscriptions_id                    UUID NOT NULL,
    subscriptions_user_id               UUID NOT NULL UNIQUE,
    subscriptions_subscription_plan_id  VARCHAR(255),
    subscriptions_frequency             VARCHAR(63) NOT NULL, -- core.subscription_frequency.subscription_frequency_name
    subscriptions_is_active             BOOLEAN NOT NULL DEFAULT TRUE,
    subscriptions_renews_at             TIMESTAMPTZ,
    subscriptions_starts_at             TIMESTAMPTZ DEFAULT NOW(),
    subscriptions_ends_at               TIMESTAMPTZ,
    subscriptions_created_at            TIMESTAMPTZ DEFAULT NOW(),
    subscriptions_updated_at            TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT subscriptions_pk PRIMARY KEY (subscriptions_id),
    CONSTRAINT subscriptions_user_id_fk FOREIGN KEY (subscriptions_user_id) REFERENCES core.users(user_id),
    CONSTRAINT subscriptions_subscription_plan_id_fk FOREIGN KEY (subscriptions_subscription_plan_id) REFERENCES core.subscription_plans(subscription_plan_id)
);

CREATE TABLE core.subscription_frequency (
    subscription_frequency_name                    VARCHAR(63) NOT NULL, -- 'DAY', 'WEEK', 'MONTH', 'YEAR'
    subscription_frequency_subscription_plan_id    UUID NOT NULL,
    subscription_frequency_plan_price              FLOAT DEFAULT 0.0,
    subscription_frequency_plan_href               VARCHAR(255),
    subscription_frequency_plan_created_at         TIMESTAMPTZ DEFAULT NOW(),
    subscription_frequency_plan_updated_at         TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT subscription_frequency_PK PRIMARY KEY (subscription_frequency_name, subscription_frequency_subscription_plan_id),
    CONSTRAINT subscription_frequency_subscription_plan_id_fk FOREIGN KEY (subscription_frequency_subscription_plan_id) REFERENCES core.subscription_plans(subscription_plan_id)
)