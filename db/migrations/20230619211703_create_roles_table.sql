-- migrate:up

CREATE TABLE IF NOT EXISTS core.roles (
  role_id UUID NOT NULL,
  role_name VARCHAR(63) NOT NULL,
  role_created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  role_updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  
  CONSTRAINT roles_pk PRIMARY KEY (role_id),
  CONSTRAINT role_name_unique UNIQUE (role_name)
);

-- migrate:down

