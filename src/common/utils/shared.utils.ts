export const isUndefined = (obj: any): boolean => {
  return typeof obj === 'undefined';
};

export const isDefined = (obj: any): boolean => {
  return !isUndefined(obj);
};

export const isNull = (obj: any): boolean => {
  return obj === null;
};

export const isObject = (fn: any): boolean => {
  return !isNil(fn) && typeof fn === 'object';
};

export const isFunction = (val: any): boolean => {
  return typeof val === 'function';
};

export const isString = (val: any): boolean => {
  return typeof val === 'string';
};

export const isNumber = (val: any): boolean => {
  return typeof val === 'number';
};

export const isNil = (val: any): boolean => {
  return isUndefined(val) || val === null;
};

export const isEmpty = (array: any): boolean => {
  return !(array && array.length > 0);
};
