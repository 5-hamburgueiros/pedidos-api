import { HttpStatus } from '@nestjs/common';

export const getHttpStatusKeyByValue = (value: number): string => {
  const indexOfS = Object.values(HttpStatus).indexOf(value);

  const key = Object.keys(HttpStatus)[indexOfS];

  return key ?? 'INTERNAL_SERVER_ERROR';
};
