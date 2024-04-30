/* eslint-disable @typescript-eslint/no-namespace */
import { AbstractEntity } from './abstract.entity';

export class PagamentoEntity {
  public readonly id: string;
  public readonly qrData: string;
  public readonly idExterno: string;
  
  constructor(params: PagamentoModel.Params) {
    this.id = params.id;
    this.qrData = params.qrData;
    this.idExterno = params.idExterno;
  }

  static FromTypeOrmModel(param: PagamentoModel.Params): PagamentoEntity {
    return new PagamentoEntity({
      id: param.id,
      qrData: param.qrData,
      idExterno: param.idExterno,
    });
  }
}

export namespace PagamentoModel {
  export type Params = {
    id?: string;
    qrData: string;
    idExterno: string;
  };
}
