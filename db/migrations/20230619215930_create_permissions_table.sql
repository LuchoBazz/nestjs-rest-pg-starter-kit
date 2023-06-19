-- migrate:up

CREATE TABLE IF NOT EXISTS core.permissions (
  permission_id UUID NOT NULL,
  permission_role VARCHAR(63) NOT NULL,
  permission_name VARCHAR(63) NOT NULL,
  permission_created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  permission_updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  
  CONSTRAINT permissions_pk PRIMARY KEY (permission_id),
  CONSTRAINT roles_permissions_fk FOREIGN KEY (permission_role) REFERENCES core.roles(role_name)
);

-- migrate:down

