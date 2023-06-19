-- migrate:up

CREATE TYPE core.feature_flag_type_enum AS ENUM ('BOOLEAN', 'ENUM', 'JSON');

CREATE TABLE IF NOT EXISTS core.feature_flags (
  feature_flag_id UUID NOT NULL,
  feature_flag_key varchar(2047) NOT NULL,
  feature_flag_value text NULL,
  feature_flag_is_active BOOLEAN NOT NULL DEFAULT TRUE,
  feature_flag_type core."feature_flag_type_enum" NOT NULL,
  feature_flag_organization VARCHAR(63) NOT NULL,
  feature_flag_created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  feature_flag_updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  
  CONSTRAINT feature_flags_pk PRIMARY KEY (feature_flag_id),
  CONSTRAINT feature_flags_organizations_fk FOREIGN KEY (feature_flag_organization) REFERENCES core.organizations(organization_client_id)
);

-- migrate:down
