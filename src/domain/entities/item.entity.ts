/* eslint-disable @typescript-eslint/no-namespace */
import { CategoriaItem } from '../enum';
import { AbstractEntity } from './abstract.entity';

export class ItemEntity extends AbstractEntity {
  public readonly nome: string;
  public readonly valor: number;
  public readonly categoria: CategoriaItem;
  
  constructor(params: ItemModel.Params) {
    super(params.id, params.criadoEm, params.atualizadoEm);
    this.nome = params.nome;
    this.valor = params.valor;
    this.categoria = params.categoria;
  }

  static FromTypeOrmModel(param: ItemModel.Params): ItemEntity {
    return new ItemEntity({
      id: param.id,
      nome: param.nome,
      valor: param.valor,
      categoria: param.categoria,
      criadoEm: param.criadoEm,
      atualizadoEm: param.atualizadoEm,
    });
  }
}

export namespace ItemModel {
  export type Params = {
    id?: string;
    nome: string;
    valor: number;
    categoria: CategoriaItem;
    criadoEm?: string;
    atualizadoEm?: string;
  };
}
