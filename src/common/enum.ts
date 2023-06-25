export const parseEnum = <T>(enumObj: T, value?: string | null): T[keyof T] | null => {
  const enumValues = Object.values(enumObj);
  for (const enumValue of enumValues) {
    if (typeof enumValue === 'string' && enumValue.toLowerCase() === value.toLowerCase()) {
      return enumValue as T[keyof T];
    }
  }
  return null;
};
