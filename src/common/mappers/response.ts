export interface RestResponseWithoutPagination<T> {
  data: T;
}

export const responseWithoutPagination = <T>(data: T): RestResponseWithoutPagination<T> => {
  return { data };
};
