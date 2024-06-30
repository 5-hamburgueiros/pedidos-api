import { StatusPagamento } from "@/domain/enum";

export class MensagemPagamentoStatusDTO {
  private status: StatusPagamento;
  private idPedido: string;

  constructor() { }

  setStatus(status: StatusPagamento): MensagemPagamentoStatusDTO {
    this.status = status;
    return this;
  }

  setIdPedido(idPedido: string): MensagemPagamentoStatusDTO {
    this.idPedido = idPedido;
    return this;
  }

  toString(): string {
    return JSON.stringify({
      status: this.status,
      idPedido: this.idPedido,
    });
  }
}