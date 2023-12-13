-- migrate:up

CREATE TABLE IF NOT EXISTS core.feature_flags (
  feature_flag_id UUID NOT NULL,
  feature_flag_key VARCHAR(255) NOT NULL,
  feature_flag_value BOOLEAN NOT NULL DEFAULT FALSE,
  feature_flag_percentage SMALLINT NOT NULL DEFAULT 0 CHECK (0 <= feature_flag_percentage AND feature_flag_percentage <= 100),
  feature_flag_is_experimental BOOLEAN NOT NULL DEFAULT FALSE,
  feature_flag_is_active BOOLEAN NOT NULL DEFAULT TRUE,
  feature_flag_organization VARCHAR(63) NOT NULL,
  feature_flag_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  feature_flag_updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  
  CONSTRAINT feature_flags_pk PRIMARY KEY (feature_flag_id),
  CONSTRAINT feature_flags_organizations_fk FOREIGN KEY (feature_flag_organization) REFERENCES core.organizations(organization_client_id)
);

-- migrate:down
