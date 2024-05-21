import { PedidoEntity } from '@/domain/entities';

export interface ICreatePedido {
  execute(params: ICreatePedido.Params): Promise<ICreatePedido.Result>;
}

export const ICreatePedido = Symbol('ICreatePedido');

export namespace ICreatePedido {
  export type Params = {
    cliente?: string;
    combos?: Array<string>;
    itens?: Array<string>;
  };

  export type Result = PedidoEntity;
}
