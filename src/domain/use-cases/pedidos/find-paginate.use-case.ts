/* eslint-disable @typescript-eslint/no-namespace */
import { PaginacaoDto } from '@/api/dtos/paginacao.dto';
import { PedidoEntity } from '@/domain/entities';
import { StatusPedido } from '@/domain/enum';
import { ObjectId } from 'typeorm';

export interface IFindPaginate {
  execute(params: IFindPaginate.Params): Promise<IFindPaginate.Result>;
}

export const IFindPaginate = Symbol('IFindPaginate');

export namespace IFindPaginate {
  export type Params = {
    status?: StatusPedido[];
    documento?: string;
    limite?: number;
    pagina?: number;
  };

  export type Result = PaginacaoDto;
}
