-- migrate:up

INSERT INTO core.roles (role_id, role_name) VALUES ('5676432b-acc1-4cb4-b1ac-a87a6d7f984c','USER') ON CONFLICT (role_id) DO NOTHING;
INSERT INTO core.roles (role_id, role_name) VALUES ('17e44baa-47ec-4561-866e-f667598dbb30','INTERNAL_ADMIN')ON CONFLICT (role_id) DO NOTHING;
INSERT INTO core.roles (role_id, role_name) VALUES ('88ae27c1-6e4e-4a30-bfe3-b437596f7a7b','EXTERNAL_ADMIN')ON CONFLICT (role_id) DO NOTHING;

-- migrate:down

