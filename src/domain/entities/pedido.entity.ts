/* eslint-disable @typescript-eslint/no-namespace */
import { IdGenerator } from '@/common';
import { StatusPedido } from '../enum';
import { PedidoVazioException } from '../exceptions/pedido-vazio.exception';
import { AbstractEntity } from './abstract.entity';
import { ClienteEntity } from './cliente.entity';
import { ComboEntity } from './combo.entity';
import { ItemEntity } from './item.entity';
import { PagamentoEntity } from './pagamento.entity';
import axios from 'axios';

export class PedidoEntity extends AbstractEntity {
  public _id: string;
  public numero: number;
  public valor: number;
  public status: StatusPedido;
  public cliente?: ClienteEntity;
  public combos?: ComboEntity[];
  public itens?: ItemEntity[];
  public pagamento?: PagamentoEntity;
  public idPedido: string;

  constructor(params: PedidoModel.Params) {
    super(
      params.idPedido,
      params.criadoEm,
      params.atualizadoEm,
    );
    this.idPedido = params.idPedido;
    this.numero = params.numero;
    this.status = params.status;
    this.cliente = params.cliente;
  }

  public addCliente(cliente: ClienteEntity): void {
    this.cliente = cliente;
  }

  public addPagamento(pagamento: PagamentoEntity): void {
    this.pagamento = pagamento;
  }

  public addCombos(combos: ComboEntity[]): void {
    this.combos = combos;
  }

  public addItem(itens: ItemEntity[]): void {
    this.itens = itens;
  }

  public calcularValor(): void {
    let valor = 0;
    if (this.combos) {
      valor += this.combos.reduce((acc, combo) => {
        return acc + combo.valor;
      }, 0);
    }
    if (this.itens) {
      valor += this.itens.reduce((acc, item) => {
        return acc + item.valor;
      }, 0);
    }
    this.valor = valor;
  }

  public fecharPedido(): void {
    if((!this.itens || this.itens.length === 0) && (!this.combos || this.combos.length === 0)){
      throw new PedidoVazioException('O pedido não possui nenhum item ou combo');
    }

    this.calcularValor();
    this.status = StatusPedido.AGUARDANDO_PAGAMENTO;
    this.idPedido = IdGenerator.Generate();
  }

  public pagar(): void {
    if (this.status !== StatusPedido.EM_ANDAMENTO) {
      throw new Error('Pedido não está em andamento');
    }
    this.status = StatusPedido.AGUARDANDO_PAGAMENTO;
    // TODO: lançar evento de pedido aguardando pagamento
  }

  public adicionaPagamento(): void {
    if (this.status !== StatusPedido.AGUARDANDO_PAGAMENTO) {
      throw new Error('Pedido não está aguardando pagamento');
    }
    this.status = StatusPedido.PAGO;
    // TODO: lançar evento de pedido pago
  }

  public recebido(): void {
    if (this.status !== StatusPedido.PAGO) {
      throw new Error('Pedido não está pago');
    }

    this.status = StatusPedido.RECEBIDO;
  }

  public pago(): void {
    if (this.status !== StatusPedido.AGUARDANDO_PAGAMENTO) {
      throw new Error('Pedido não está aguardando pagamento');
    }
    this.status = StatusPedido.RECEBIDO;
  }
  public emPreparacao(): void {
    if (this.status !== StatusPedido.RECEBIDO) {
      throw new Error('Pedido não foi recebido.');
    }
    this.status = StatusPedido.EM_PREPARACAO;
    // TODO: lançar evento de pedido em preparação
  }

  public pronto(): void {
    if (this.status !== StatusPedido.EM_PREPARACAO) {
      throw new Error('Pedido não está em preparação');
    }
    this.status = StatusPedido.PRONTO;
    // TODO: Lançar evento de pedido pronto
  }

  public cancelar(): void {
    const isValid = [
      StatusPedido.AGUARDANDO_PAGAMENTO,
      StatusPedido.EM_PREPARACAO,
    ].includes(this.status);

    if (!isValid) {
      throw new Error('Pedido não está aguardando pegamento ou em preparação');
    }
    this.status = StatusPedido.CANCELADO;
  }

  public finalizar(): void {
    if (this.status !== StatusPedido.PRONTO) {
      throw new Error('Pedido não está pronto');
    }
    this.status = StatusPedido.FINALIZADO;
  }

  static FromTypeOrmModel(param: PedidoModel.Params): PedidoEntity {
    return new PedidoEntity({
      idPedido: param.idPedido,
      numero: param.numero,
      status: param.status,
      criadoEm: param.criadoEm,
      atualizadoEm: param.atualizadoEm,
      cliente: param.cliente,
    });
  }
}
export namespace PedidoModel {
  export type Params = {
    idPedido?: string;
    numero: number;
    status: StatusPedido;
    criadoEm?: string;
    atualizadoEm?: string;
    cliente?: ClienteEntity
    combos?: ComboEntity[];
    itens?: ItemEntity[];
    pagamento?: PagamentoEntity;
  };
}
