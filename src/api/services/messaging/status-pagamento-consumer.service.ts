import { IUpdateStatusPedidoUseCase } from '@/domain/use-cases/pedidos/update-status-pedido.use-case';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class StatusPagamentoConsumerService {

  constructor(
    @Inject(IUpdateStatusPedidoUseCase)
    private readonly updateStatusPedidoUseCase: IUpdateStatusPedidoUseCase,
  ) { } 

  @RabbitSubscribe({ queue: 'pagamentos_confirmados' })
  public async recebePagamentosConfirmados(msg: IUpdateStatusPedidoUseCase.Params) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
    this.updateStatusPedidoUseCase.execute(msg);
  }

  @RabbitSubscribe({ queue: 'pagamentos_cancelados' })
  public async recebePagamentosCancelados(msg: IUpdateStatusPedidoUseCase.Params) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
    this.updateStatusPedidoUseCase.execute(msg);
  }

  @RabbitSubscribe({ queue: 'pedido_compensatorio_pedido' })
  public async compensarPagamento(msg: IUpdateStatusPedidoUseCase.Params) {
    console.log(`Received message compensarPagamento: ${JSON.stringify(msg)}`);
    this.updateStatusPedidoUseCase.execute(msg);
  }
}