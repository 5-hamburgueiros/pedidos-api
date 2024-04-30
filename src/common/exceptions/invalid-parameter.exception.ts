import { HttpStatus } from '@nestjs/common';
import { DefaultException } from './default.exception';

export class InvalidParameterException extends DefaultException {
  public code: string;
  public propertyName: string;
  constructor(code: string, message: string, propertyName: string) {
    super(code, message, HttpStatus.BAD_REQUEST);
    this.propertyName = propertyName;
  }
}
