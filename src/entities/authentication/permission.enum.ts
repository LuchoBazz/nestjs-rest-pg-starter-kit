export enum PermissionsValues {
  GUEST_USER = 'GUEST_USER',

  READ_FEATURE_FLAGS = 'READ_FEATURE_FLAGS',
  CREATE_FEATURE_FLAGS = 'CREATE_FEATURE_FLAGS',
  UPDATE_FEATURE_FLAGS = 'UPDATE_FEATURE_FLAGS',
  REMOVE_FEATURE_FLAGS = 'INTERNAL_ADMIN_REMOVE_FEATURE_FLAGS',

  READ_CONFIGURATIONS = 'READ_CONFIGURATIONS',
  CREATE_CONFIGURATIONS = 'CREATE_CONFIGURATIONS',
  UPDATE_CONFIGURATIONS = 'UPDATE_CONFIGURATIONS',
  REMOVE_CONFIGURATIONS = 'INTERNAL_ADMIN_REMOVE_CONFIGURATIONS',

  READ_SUBSCRIPTION_PLANS = 'READ_SUBSCRIPTION_PLANS',
  CREATE_SUBSCRIPTION_PLANS = 'ADMIN_CREATE_SUBSCRIPTION_PLANS',
  UPDATE_SUBSCRIPTION_PLANS = 'ADMIN_UPDATE_SUBSCRIPTION_PLANS',
  REMOVE_SUBSCRIPTION_PLANS = 'INTERNAL_ADMIN_REMOVE_SUBSCRIPTION_PLANS',
}
