import { DefaultException } from '@/common/exceptions/default.exception';
import { HttpStatus } from '@nestjs/common';

export class PedidoVazioException extends DefaultException {
  constructor(message: string) {
    super('PEDIDO_VAZIO', message, HttpStatus.BAD_REQUEST);
  }
}
