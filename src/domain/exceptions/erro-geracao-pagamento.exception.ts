import { DefaultException } from '@/common/exceptions/default.exception';
import { HttpStatus } from '@nestjs/common';

export class GeracaoPagamentoException extends DefaultException {
  constructor(message: string) {
    super(
      'ERRO_NA_GERACAO_DO_PAGAMENTO',
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
