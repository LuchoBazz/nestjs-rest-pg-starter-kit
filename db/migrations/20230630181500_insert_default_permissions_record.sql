-- migrate:up

-- INTERNAL ADMIN ROLES
INSERT INTO core.permissions (permission_id, permission_role, permission_name)
    VALUES('c4f8e15e-1eee-4239-b81a-f63535b65bf8', 'INTERNAL_ADMIN', 'READ_FEATURE_FLAGS') ON CONFLICT (permission_id) DO NOTHING;
INSERT INTO core.permissions (permission_id, permission_role, permission_name)
    VALUES('5c40b339-2961-4247-9571-b58ce47e2a09', 'INTERNAL_ADMIN', 'CREATE_FEATURE_FLAGS') ON CONFLICT (permission_id) DO NOTHING;
INSERT INTO core.permissions (permission_id, permission_role, permission_name)
    VALUES('545daf5c-6625-4c5a-b069-552cf0538575', 'INTERNAL_ADMIN', 'UPDATE_FEATURE_FLAGS') ON CONFLICT (permission_id) DO NOTHING;
INSERT INTO core.permissions (permission_id, permission_role, permission_name)
    VALUES('949bac40-dbe6-4196-8054-d5400ed22fe8', 'INTERNAL_ADMIN', 'REMOVE_FEATURE_FLAGS') ON CONFLICT (permission_id) DO NOTHING;

-- EXTERNAL ADMIN ROLES
INSERT INTO core.permissions (permission_id, permission_role, permission_name)
    VALUES('74b6977a-2d8c-4341-8e02-7c05e73ad31b', 'EXTERNAL_ADMIN', 'READ_FEATURE_FLAGS') ON CONFLICT (permission_id) DO NOTHING;

-- migrate:down

