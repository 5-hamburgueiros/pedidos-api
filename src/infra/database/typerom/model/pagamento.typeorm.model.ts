import { CategoriaItem } from '@/domain/enum';
import { Column } from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';

export class PagamentoModelTypeOrm extends AbstractModel {
  @Column()
  id: string;

  @Column()
  qrData: string;

  @Column()
  idExterno: string;

  constructor(
    id: string,
    qrData: string,
    idExterno: string
  ) {
    super();
    this.id = id;
    this.qrData = qrData;
    this.idExterno = idExterno;
  }
}
