-- migrate:up

CREATE TYPE core.auth_provider_enum AS ENUM ('FIREBASE', 'SUPABASE');
CREATE TYPE core.auth_type_enum AS ENUM ('EMAIL_AND_PASSWORD', 'FACEBOOK_AUTH', 'GOOGLE_AUTH', 'GITHUB_AUTH');

CREATE TABLE IF NOT EXISTS core.users (
  user_id UUID NOT NULL,
  user_username VARCHAR(63) NOT NULL,
  user_first_name VARCHAR(63) NOT NULL,
  user_last_name VARCHAR(63) NOT NULL,
  user_email VARCHAR(63) NOT NULL,
  user_terms BOOLEAN NOT NULL DEFAULT FALSE,
  user_notifications BOOLEAN NOT NULL DEFAULT FALSE,
  user_is_active BOOLEAN NOT NULL DEFAULT TRUE,
  user_uid VARCHAR(255) NOT NULL,
  user_role VARCHAR(63) NOT NULL,
  user_auth_provider core."auth_provider_enum" NOT NULL,
  user_auth_type core."auth_type_enum" NOT NULL,
  user_organization VARCHAR(63) NOT NULL,
  user_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  user_updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  user_dynamic_info JSONB NOT NULL DEFAULT '{}'::JSONB,

  CONSTRAINT users_pk PRIMARY KEY (user_id),
  CONSTRAINT users_organizations_fk FOREIGN KEY (user_organization) REFERENCES core.organizations(organization_client_id),
  CONSTRAINT roles_users_fk FOREIGN KEY (user_role) REFERENCES core.roles(role_name)
);

-- migrate:down
