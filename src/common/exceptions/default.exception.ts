import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DefaultException extends HttpException {
  @ApiProperty()
  public code: string;
  @ApiPropertyOptional()
  public propertyName: string;
  @ApiProperty()
  public message: string;

  constructor(code: string, message: string, status: HttpStatus) {
    super(message, status);
    this.code = code;
  }
}
