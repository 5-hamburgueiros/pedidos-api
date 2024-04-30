import { StatusPedido } from '@/domain/enum';
import { Column } from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';

export class PedidoHistoricoModelTypeOrm extends AbstractModel {
  @Column()
  status: StatusPedido;

  constructor(status: StatusPedido, criadoEm: string, atualizadoEm: string) {
    super();
    this.status = status;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }
}
