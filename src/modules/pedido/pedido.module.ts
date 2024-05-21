import { PedidoController } from '@/api/controllers/pedido.controller';
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
  IPagamentoPedido,
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
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  providers: [
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
  ],
})
export class PedidoModule {}
