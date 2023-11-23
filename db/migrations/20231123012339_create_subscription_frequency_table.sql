-- migrate:up

CREATE TABLE core.subscription_frequency (
  subscription_frequency_name                    VARCHAR(63) NOT NULL,
  subscription_frequency_subscription_plan_id    UUID NOT NULL,
  subscription_frequency_plan_price              FLOAT DEFAULT 0.0,
  subscription_frequency_plan_href               VARCHAR(255),
  subscription_frequency_plan_created_at         TIMESTAMPTZ DEFAULT NOW(),
  subscription_frequency_plan_updated_at         TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT subscription_frequency_PK PRIMARY KEY (subscription_frequency_name, subscription_frequency_subscription_plan_id),
  CONSTRAINT subscription_frequency_subscription_plan_id_fk FOREIGN KEY (subscription_frequency_subscription_plan_id) REFERENCES core.subscription_plans(subscription_plan_id)
)

-- migrate:down
