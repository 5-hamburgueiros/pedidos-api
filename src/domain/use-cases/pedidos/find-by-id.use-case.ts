/* eslint-disable @typescript-eslint/no-namespace */
import { PedidoEntity } from '@/domain/entities';

export interface IFindById {
  execute(params: IFindById.Params): Promise<IFindById.Result>;
}

export const IFindById = Symbol('IFindById');

export namespace IFindById {
  export type Params = {
    id: string;
  };

  export type Result = PedidoEntity;
}
