-- migrate:up

CREATE TABLE IF NOT EXISTS core.subscriptions (
  subscriptions_id                    UUID NOT NULL,
  subscriptions_user_id               UUID NOT NULL UNIQUE,
  subscriptions_subscription_plan_id  UUID NOT NULL,
  subscriptions_frequency             VARCHAR(63) NOT NULL,
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

-- migrate:down
