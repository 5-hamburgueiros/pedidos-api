import { PedidoController } from '@/api/controllers/pedido.controller';
import { StatusPagamentoConsumerService } from '@/api/services/messaging/status-pagamento-consumer.service';
import { StatusPedidoProducerService } from '@/api/services/messaging/status-pedido-producer.service';
import {
  CreatePedidoUseCase,
  FindPedidoByIdUseCase,
} from '@/application/use-cases';
import { FindPedidoPaginateUseCase } from '@/application/use-cases/pedidos/find-paginate.use-case';
import { UpdateStatusPedidoUseCase } from '@/application/use-cases/pedidos/update-status-pedido.use-case';
import { IPedidoRepository } from '@/domain/repository';
import {
  ICreatePedido,
  IFindById,
  IFindPaginate,
} from '@/domain/use-cases';
import { IUpdateStatusPedidoUseCase } from '@/domain/use-cases/pedidos/update-status-pedido.use-case';
import {
  ClienteModelTypeOrm,
  ComboModelTypeOrm,
  ItemModelTypeOrm,
  PedidoHistoricoModelTypeOrm,
  PedidoModelTypeOrm,
} from '@/infra/database/typerom/model';
import { PedidoRepositoryTypeOrm } from '@/infra/repository/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';

const services: Provider[] = [
  {
    provide: ICreatePedido,
    useClass: CreatePedidoUseCase,
  },
  {
    provide: IFindById,
    useClass: FindPedidoByIdUseCase,
  },
  {
    provide: IFindPaginate,
    useClass: FindPedidoPaginateUseCase,
  },
  {
    provide: IPedidoRepository,
    useClass: PedidoRepositoryTypeOrm,
  },
  {
    provide: IUpdateStatusPedidoUseCase,
    useClass: UpdateStatusPedidoUseCase,
  },
  StatusPagamentoConsumerService,
  StatusPedidoProducerService,
]
@Module({
  controllers: [PedidoController],
  imports: [
    TypeOrmModule.forFeature([
      PedidoModelTypeOrm,
      ItemModelTypeOrm,
      ClienteModelTypeOrm,
      ComboModelTypeOrm,
      PedidoHistoricoModelTypeOrm,
    ]),
    HttpModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: async (configService: ConfigService) => {
        const queue = configService.get('QUEUE_PAGAMENTOS_CONFIRMADOS');
        const host = configService.get('RMQ_HOST');
        const user = configService.get('RMQ_USER');
        const password = configService.get('RMQ_PASSWORD');
        return {
          uri: [`amqp://${user}:${password}@${host}`],
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    ...services,
  ],
  exports: [...services]
})
export class PedidoModule { }
