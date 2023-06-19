-- migrate:up

CREATE TABLE IF NOT EXISTS core.organizations (
  organization_id uuid NOT NULL,
  organization_name VARCHAR(127) NOT NULL;
  organization_client_id VARCHAR(63) NOT NULL;
  organization_alpha_user int4 NULL;
  organization_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(6);
  organization_updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(6);
);

-- migrate:down
