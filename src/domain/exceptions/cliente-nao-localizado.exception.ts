import { DefaultException } from '@/common/exceptions/default.exception';
import { HttpStatus } from '@nestjs/common';

export class ClienteNaoLocalizadoException extends DefaultException {
  constructor(message: string) {
    super('CLIENT_NAO_LOCALIZADO', message, HttpStatus.NOT_FOUND);
  }
}
