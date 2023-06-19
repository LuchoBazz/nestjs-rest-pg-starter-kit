-- migrate:up

CREATE TABLE IF NOT EXISTS core.configurations (
  configuration_id UUID NOT NULL,
  configuration_key varchar(255) NOT NULL,
  configuration_value text NULL,
  configuration_organization VARCHAR(63) NOT NULL,
  configuration_created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  configuration_updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  
  CONSTRAINT configurations_pk PRIMARY KEY (configuration_id),
  CONSTRAINT configurations_organizations_fk FOREIGN KEY (configuration_organization) REFERENCES core.organizations(organization_client_id)
);

-- migrate:down
