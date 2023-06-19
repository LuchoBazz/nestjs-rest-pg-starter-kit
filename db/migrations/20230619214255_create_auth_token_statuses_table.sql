-- migrate:up

CREATE TABLE IF NOT EXISTS core.auth_token_statuses (
  auth_token_id UUID NOT NULL,
  auth_token_user UUID NOT NULL,
  auth_token_issued_at BIGINT NOT NULL,
  auth_token_expiration_time BIGINT NOT NULL,
  auth_token_created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  auth_token_updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  
  CONSTRAINT auth_token_statuses_pk PRIMARY KEY (auth_token_id),
  CONSTRAINT auth_token_statuses_users_fk FOREIGN KEY (auth_token_user) REFERENCES core.users(user_id)
);

-- migrate:down

