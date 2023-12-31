-- migrate:up

CREATE TYPE core.configuration_type_enum AS ENUM ('ENUM', 'JSON');

CREATE TABLE IF NOT EXISTS core.configurations (
  configuration_id UUID NOT NULL,
  configuration_key VARCHAR(255) NOT NULL,
  configuration_value TEXT NOT NULL,
  configuration_type core."configuration_type_enum" NOT NULL,
  configuration_organization VARCHAR(63) NOT NULL,
  configuration_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  configuration_updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  
  CONSTRAINT configurations_pk PRIMARY KEY (configuration_id),
  CONSTRAINT configurations_organizations_fk FOREIGN KEY (configuration_organization) REFERENCES core.organizations(organization_client_id)
);

-- migrate:down
