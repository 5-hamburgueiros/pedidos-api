import { StatusPedido } from '@/domain/enum';
import { Column, Entity, Index, ObjectId, ObjectIdColumn } from 'typeorm';
import {
  ClienteModelTypeOrm,
  ComboModelTypeOrm,
  ItemModelTypeOrm,
  PedidoHistoricoModelTypeOrm,
  PagamentoModelTypeOrm,
} from '.';
import { AbstractModel } from './abstract.typeorm.model';

@Entity({ name: 'Pedido' })
export class PedidoModelTypeOrm extends AbstractModel {
  @ObjectIdColumn({ name: '_id' })
  _id: ObjectId;

  @Column()
  numero: number;

  @Column()
  valor: number;

  @Column()
  status: StatusPedido;

  @Column((type) => ClienteModelTypeOrm)
  cliente: ClienteModelTypeOrm;

  @Column((type) => ItemModelTypeOrm)
  itens: ItemModelTypeOrm[];

  @Column((type) => ComboModelTypeOrm)
  combos: ComboModelTypeOrm[];

  @Column((type) => PedidoHistoricoModelTypeOrm)
  historicoStatus: PedidoHistoricoModelTypeOrm[];

  @Column((type) => PagamentoModelTypeOrm)
  pagamento: PagamentoModelTypeOrm;

  @Column()
  idPedido: string;

  constructor(
    _id: ObjectId,
    numero: number,
    valor: number,
    status: StatusPedido,
    cliente: ClienteModelTypeOrm,
    itens: ItemModelTypeOrm[],
    combos: ComboModelTypeOrm[],
    historicoStatus: PedidoHistoricoModelTypeOrm[],
    pagamento: PagamentoModelTypeOrm,
    idPedido: string,
  ) {
    super();
    this._id = _id;
    this.numero = numero;
    this.valor = valor;
    this.status = status;
    this.cliente = cliente;
    this.itens = itens;
    this.combos = combos;
    this.historicoStatus = historicoStatus;
    this.pagamento = pagamento;
    this.idPedido = idPedido
  }
}
