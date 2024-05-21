/* eslint-disable @typescript-eslint/no-namespace */
import { UpdateResult } from 'typeorm';
import { PedidoEntity } from '../entities';
import { StatusPedido } from '../enum';
import { PaginacaoDto } from '@/api/dtos/paginacao.dto';

export interface IPedidoRepository {
  create(
    params: IPedidoRepository.Create.Params,
  ): Promise<IPedidoRepository.Create.Result>;
  findById(
    params: IPedidoRepository.FindById.Params,
  ): Promise<IPedidoRepository.FindById.Result>;
  findPaginate(
    params: IPedidoRepository.FindPaginate.Params,
  ): Promise<IPedidoRepository.FindPaginate.Result>;
  updatePayment(
    params: IPedidoRepository.UpdatePayment.Params,
  ): Promise<IPedidoRepository.UpdatePayment.Result>;
  getNumeroPedido(): Promise<number>;
}

export const IPedidoRepository = Symbol('IPedidoRepository');

export namespace IPedidoRepository {
  export namespace Create {
    export type Params = {
      pedido: PedidoEntity;
    };
    export type Result = PedidoEntity;
  }
  export namespace FindById {
    export type Params = {
      id: string;
    };
    export type Result = PedidoEntity;
  }

  export namespace FindPaginate {
    export type Params = {
      status?: StatusPedido[];
      documento?: string;
      limite?: number;
      pagina?: number;
    };
    export type Result = PaginacaoDto;
  }

  export namespace UpdatePayment {
    export type Params = {
      pedido: PedidoEntity;
    };
    export type Result = UpdateResult;
  }
}
