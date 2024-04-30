import { DefaultException } from '@/common/exceptions/default.exception';
import { HttpStatus } from '@nestjs/common';

export class StatusNaoPermitidoException extends DefaultException {
  constructor(message: string) {
    super('STATUS_NAO_PERMITIDO', message, HttpStatus.BAD_REQUEST);
  }
}
