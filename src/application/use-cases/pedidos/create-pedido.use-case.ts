import { PagamentoEntity, PedidoEntity } from '@/domain/entities';
import {
  ClienteNaoLocalizadoException,
  GeracaoPagamentoException,
} from '@/domain/exceptions';
import { IPedidoRepository } from '@/domain/repository';
import { ICreatePedido } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CreatePedidoUseCase implements ICreatePedido {
  constructor(
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
  ) { }

  async execute(params: ICreatePedido.Params): Promise<PedidoEntity> {
    const numeroPedido = await this.pedidoRepository.getNumeroPedido();
    const pedido = new PedidoEntity({
      numero: numeroPedido,
      idPedido: undefined,
      status: undefined,
    });
    if (params.cliente) {
      await axios
        .get(`${process.env.CLIENTE_API_URL}/clientes/${params.cliente}`)
        .then(function (response) {
          pedido.addCliente(response.data);
        })
        .catch(function (error) {
          throw new ClienteNaoLocalizadoException(
            'Cliente não localizado para o documento informado',
          );
        });
    }

    if (params.itens) {
      await axios
        .get(`${process.env.CARDAPIO_API_URL}/itens`, {
          params: { ids: params.itens, limit: 100 },
          paramsSerializer: { indexes: null },
        })
        .then(function (response) {
          pedido.addItem(response.data.items);
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    if (params.combos) {
      await axios
        .get(`${process.env.CARDAPIO_API_URL}/combos`, {
          params: { ids: params.combos, limit: 100 },
          paramsSerializer: { indexes: null },
        })
        .then(function (response) {
          pedido.addCombos(response.data.items);
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    pedido.fecharPedido();
    const requestPagamento = {
      idPedido: pedido.idPedido,
      valorTotal: pedido.valor
    }
    await axios
      .post(`${process.env.PAGAMENTO_API_URL}/pagamentos`, requestPagamento)
      .then(function (response) {
        const pagamento = new PagamentoEntity({
          id: response.data.id,
          qrData: response.data.qrData,
          idExterno: response.data.idExterno,
        });
        pedido.addPagamento(pagamento);
      })
      .catch(function (error) {
        throw new GeracaoPagamentoException(
          'Falha ao chamar a api de pagamentos',
        );
      });
    //adicionar dps parte de pgmt no pedido
    // const pagamento = new PagamentoEntity({
    //   id: 'e795c573-1698-4f8d-9353-eec983c45e4f',
    //   qrData: 'dsfsdfsdfsdfsdfsdfsdfsdfsd',
    //   idExterno: 'e795c573-1698-4f8d-9353-eec983c45e42',
    // });
    // pedido.addPagamento(pagamento);

    const pedidoCriado = await this.pedidoRepository.create({
      pedido,
    });

    return pedidoCriado;
  }
}
