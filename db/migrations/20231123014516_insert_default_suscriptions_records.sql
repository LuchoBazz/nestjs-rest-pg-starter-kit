-- migrate:up

INSERT INTO core.subscription_plans (subscription_plan_id, subscription_plan_name, subscription_plan_product_id, subscription_plan_variants, subscription_plan_slug, subscription_plan_description, subscription_plan_node_quota, subscription_plan_features, subscription_plan_most_popular, subscription_plan_tier, subscription_plan_is_active, subscription_plan_organization)
VALUES('fadffd62-efd7-40bf-9f31-be8f08e2db3c', 'FREE', NULL, '{}', 'FREE', 'Description', 100, '[]'::JSONB, FALSE, 0, TRUE, 'SYK') ON CONFLICT (subscription_plan_id) DO NOTHING;

INSERT INTO core.subscription_plans (subscription_plan_id, subscription_plan_name, subscription_plan_product_id, subscription_plan_variants, subscription_plan_slug, subscription_plan_description, subscription_plan_node_quota, subscription_plan_features, subscription_plan_most_popular, subscription_plan_tier, subscription_plan_is_active, subscription_plan_organization)
VALUES('14816ea8-cc3a-41e8-a323-4f5e8f2808d0', 'PRO', NULL, '{}', 'PRO', 'Description', 100, '[]'::JSONB, FALSE, 0, TRUE, 'SYK') ON CONFLICT (subscription_plan_id) DO NOTHING;

-- FREQUENCIES FOR FREE
INSERT INTO core.subscription_frequency(subscription_frequency_name, subscription_frequency_subscription_plan_id, subscription_frequency_plan_price, subscription_frequency_plan_href)
VALUES('DAY', 'fadffd62-efd7-40bf-9f31-be8f08e2db3c', 0, NULL) ON CONFLICT (subscription_frequency_name, subscription_frequency_subscription_plan_id) DO NOTHING;

INSERT INTO core.subscription_frequency(subscription_frequency_name, subscription_frequency_subscription_plan_id, subscription_frequency_plan_price, subscription_frequency_plan_href)
VALUES('WEEK', 'fadffd62-efd7-40bf-9f31-be8f08e2db3c', 0, NULL) ON CONFLICT (subscription_frequency_name, subscription_frequency_subscription_plan_id) DO NOTHING;

INSERT INTO core.subscription_frequency(subscription_frequency_name, subscription_frequency_subscription_plan_id, subscription_frequency_plan_price, subscription_frequency_plan_href)
VALUES('MONTH', 'fadffd62-efd7-40bf-9f31-be8f08e2db3c', 0, NULL) ON CONFLICT (subscription_frequency_name, subscription_frequency_subscription_plan_id) DO NOTHING;

INSERT INTO core.subscription_frequency(subscription_frequency_name, subscription_frequency_subscription_plan_id, subscription_frequency_plan_price, subscription_frequency_plan_href)
VALUES('YEAR', 'fadffd62-efd7-40bf-9f31-be8f08e2db3c', 0, NULL) ON CONFLICT (subscription_frequency_name, subscription_frequency_subscription_plan_id) DO NOTHING;

-- FREQUENCIES FOR PRO
INSERT INTO core.subscription_frequency(subscription_frequency_name, subscription_frequency_subscription_plan_id, subscription_frequency_plan_price, subscription_frequency_plan_href)
VALUES('DAY', '14816ea8-cc3a-41e8-a323-4f5e8f2808d0', 0.35, NULL) ON CONFLICT (subscription_frequency_name, subscription_frequency_subscription_plan_id) DO NOTHING;

INSERT INTO core.subscription_frequency(subscription_frequency_name, subscription_frequency_subscription_plan_id, subscription_frequency_plan_price, subscription_frequency_plan_href)
VALUES('WEEK', '14816ea8-cc3a-41e8-a323-4f5e8f2808d0', 2.25, NULL) ON CONFLICT (subscription_frequency_name, subscription_frequency_subscription_plan_id) DO NOTHING;

INSERT INTO core.subscription_frequency(subscription_frequency_name, subscription_frequency_subscription_plan_id, subscription_frequency_plan_price, subscription_frequency_plan_href)
VALUES('MONTH', '14816ea8-cc3a-41e8-a323-4f5e8f2808d0', 10, NULL) ON CONFLICT (subscription_frequency_name, subscription_frequency_subscription_plan_id) DO NOTHING;

INSERT INTO core.subscription_frequency(subscription_frequency_name, subscription_frequency_subscription_plan_id, subscription_frequency_plan_price, subscription_frequency_plan_href)
VALUES('YEAR', '14816ea8-cc3a-41e8-a323-4f5e8f2808d0', 100, NULL) ON CONFLICT (subscription_frequency_name, subscription_frequency_subscription_plan_id) DO NOTHING;

-- migrate:down
