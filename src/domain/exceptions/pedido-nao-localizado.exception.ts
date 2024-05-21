import { DefaultException } from '@/common/exceptions/default.exception';
import { HttpStatus } from '@nestjs/common';

export class PedidoNaoLocalizadoException extends DefaultException {
  constructor(message: string) {
    super('NOT_FOUND', message, HttpStatus.NOT_FOUND);
  }
}
