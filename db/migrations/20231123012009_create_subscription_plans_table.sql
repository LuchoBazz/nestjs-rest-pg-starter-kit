-- migrate:up

CREATE TABLE core.subscription_plans (
  subscription_plan_id               UUID NOT NULL,
  subscription_plan_name             VARCHAR(63),
  subscription_plan_product_id       VARCHAR(255),
  subscription_plan_variants         VARCHAR[],
  subscription_plan_slug             VARCHAR(63) UNIQUE NOT NULL,
  subscription_plan_description      VARCHAR(255),
  subscription_plan_node_quota       INTEGER DEFAULT 100,
  subscription_plan_features         JSONB NOT NULL DEFAULT '[]'::JSONB,
  subscription_plan_most_popular     BOOLEAN DEFAULT FALSE,
  subscription_plan_tier             INTEGER DEFAULT 0,
  subscription_plan_is_active        BOOLEAN DEFAULT TRUE,
  subscription_plan_created_at       TIMESTAMPTZ DEFAULT NOW(),
  subscription_plan_updated_at       TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT subscription_plans_pk PRIMARY KEY (subscription_plan_id)
);

-- migrate:down
