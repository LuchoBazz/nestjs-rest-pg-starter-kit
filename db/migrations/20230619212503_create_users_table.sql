-- migrate:up

CREATE TYPE core.role_enum AS ENUM ('INTERNAL_ADMIN', 'EXTERNAL_ADMIN', 'USER');
CREATE TYPE core.auth_provider_enum AS ENUM ('FIREBASE', 'SUPABASE');
CREATE TYPE core.auth_type_enum AS ENUM ('EMAIL_AND_PASSWORD', 'FACEBOOK_AUTH', 'GOOGLE_AUTH', 'GITHUB_AUTH');

CREATE TABLE IF NOT EXISTS core.users (
  user_id uuid NOT NULL,
  user_username VARCHAR(63) NOT NULL,
  user_first_name VARCHAR(63) NOT NULL,
  user_last_name VARCHAR(63) NOT NULL,
  user_email VARCHAR(63) NOT NULL,
  user_terms bool NOT NULL DEFAULT false,
  user_notifications bool NOT NULL DEFAULT false,
  user_is_active bool NOT NULL DEFAULT true,
  user_uid VARCHAR(255) NOT NULL,
  user_role core."role_enum" NOT NULL,
  user_provider core."auth_provider_enum" NOT NULL,
  user_auth_type core."auth_type_enum" NOT NULL,
  user_organization int4 NOT NULL,
  user_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  user_updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  user_dynamic_info JSONB NOT NULL DEFAULT '{}'::JSONB
);

-- migrate:down
