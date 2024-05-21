import { DefaultException } from '@/common/exceptions/default.exception';
import { PedidoEntity } from '@/domain/entities';
import { StatusPedido } from '@/domain/enum';
import { PedidoNaoLocalizadoException } from '@/domain/exceptions';
import { StatusNaoPermitidoException } from '@/domain/exceptions/status-nao-permitido.exeception';
import { IPedidoRepository } from '@/domain/repository';
import { IUpdateStatusPedidoUseCase } from '@/domain/use-cases/pedidos/update-status-pedido.use-case';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class UpdateStatusPedidoUseCase implements IUpdateStatusPedidoUseCase {
  constructor(
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
  ) {}
  async execute(
    params: IUpdateStatusPedidoUseCase.Params,
  ): Promise<IUpdateStatusPedidoUseCase.Result> {
    try {
      const result = await this.pedidoRepository.findById({ id: params.id });
      if (!result) {
        throw new PedidoNaoLocalizadoException('Pedido não localizado');
      }

      const pedido = new PedidoEntity(result);
      this.handleStatus(pedido, params.status);
      Object.assign(pedido, { id: result.idPedido });


      await this.pedidoRepository.updatePayment({ pedido });

      return pedido;
    } catch (error) {
      if (error instanceof DefaultException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  private handleStatus(pedido: PedidoEntity, status: StatusPedido): void {
    switch (status) {
      case StatusPedido.EM_PREPARACAO:
        pedido.emPreparacao();
        break;
      case StatusPedido.PRONTO:
        pedido.pronto();
        break;
      case StatusPedido.CANCELADO:
        pedido.cancelar();
        break;
      case StatusPedido.FINALIZADO:
        pedido.finalizar();
        break;
      case StatusPedido.RECEBIDO:
        pedido.recebido();
        break;
      case StatusPedido.PAGO:
        pedido.pago();
        break;
      default:
        throw new StatusNaoPermitidoException('Status não permitido');
    }
  }
}
