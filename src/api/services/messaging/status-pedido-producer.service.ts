import { PedidoEntity } from '@/domain/entities';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusPedidoProducerService {

  constructor(
    private readonly amqpConnection: AmqpConnection,
  ) { }

  async enviaPedidoCozinha(pedido: PedidoEntity) {
    const mensagem = {
      pedido: pedido.idPedido,
      dataPedido: pedido.criadoEm
    };
    try {
      await this.amqpConnection.managedChannel.sendToQueue('pedidos_pagos', JSON.stringify(mensagem))
      console.log("enviei", JSON.stringify(mensagem))
    } catch (error) {
      console.log("erro ao enviar mensagem", error)
    }
  }
}