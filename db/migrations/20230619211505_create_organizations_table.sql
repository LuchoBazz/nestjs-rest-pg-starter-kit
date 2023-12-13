-- migrate:up

CREATE TABLE IF NOT EXISTS core.organizations (
  organization_id UUID NOT NULL,
  organization_name VARCHAR(127) NOT NULL,
  organization_client_id VARCHAR(63) NOT NULL,
  organization_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  organization_updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

  CONSTRAINT organization_pk PRIMARY KEY (organization_id),
  CONSTRAINT organization_client_id_unique UNIQUE (organization_client_id)
);

INSERT INTO core.organizations (organization_id, organization_name, organization_client_id) VALUES('0bbbe0c7-275c-4584-a03f-9eebba701ed9', 'Syk Organizacion', 'SYK');

-- migrate:down
