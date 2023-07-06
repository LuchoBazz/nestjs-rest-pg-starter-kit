import { format } from '@scaleleap/pg-format';

import { isDefined, isUndefined } from './shared.utils';

export interface FormatFieldsParams {
  updateData: Record<string, any>;
  columnName: Record<string, string>;
}

export const formatFields = ({ updateData, columnName }: FormatFieldsParams) => {
  return Object.entries(updateData)
    .filter(([, value]) => {
      return isDefined(value);
    })
    .map(([key, value]) => {
      if (isUndefined(columnName[key])) return '';
      return `"${columnName[key]}" = ${format('%1$L', String(value))}`;
    })
    .join(', ');
};
