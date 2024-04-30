import { Test, TestingModule } from '@nestjs/testing';
import { CreatePedidoUseCase } from './create-pedido.use-case';
import { IPedidoRepository } from '@/domain/repository';
import {
  ClienteNaoLocalizadoException,
  GeracaoPagamentoException,
} from '@/domain/exceptions';
import { PedidoEntity } from '@/domain/entities';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('CreatePedidoUseCase', () => {
  let useCase: CreatePedidoUseCase;
  let pedidoRepository: jest.Mocked<IPedidoRepository>;
  let axiosMock: MockAdapter;

  beforeEach(async () => {
    const mockPedidoRepository = {
      getNumeroPedido: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePedidoUseCase,
        { provide: IPedidoRepository, useValue: mockPedidoRepository },
      ],
    }).compile();

    useCase = module.get<CreatePedidoUseCase>(CreatePedidoUseCase);
    pedidoRepository = module.get(IPedidoRepository);
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('should create a pedido with valid params', async () => {
    const params = {
      cliente: '123',
      itens: ['item1', 'item2'],
      combos: ['combo1'],
    };

    const clienteData = { nome: 'Fulano', documento: '12345678912' };
    const itensData = { items: [{ id: 'item1' }, { id: 'item2' }] };
    const combosData = { items: [{ id: 'combo1' }] };
    const pagamentoData = { id: 'payment1', qrData: 'qrcode', idExterno: 'externalId' };

    pedidoRepository.getNumeroPedido.mockResolvedValueOnce(1);
    pedidoRepository.create.mockResolvedValueOnce(new PedidoEntity({ idPedido: 'pedido1' }));

    axiosMock.onGet(`${process.env.CLIENTE_API_URL}/clientes/123`).reply(200, clienteData);
    axiosMock.onGet(`${process.env.CARDAPIO_API_URL}/itens`).reply(200, itensData);
    axiosMock.onGet(`${process.env.CARDAPIO_API_URL}/combos`).reply(200, combosData);
    axiosMock.onPost(`${process.env.PAGAMENTO_API_URL}/pagamentos`).reply(200, pagamentoData);

    const result = await useCase.execute(params);

    expect(result).toBeInstanceOf(PedidoEntity);
    expect(result.idPedido).toBe('pedido1');
    expect(pedidoRepository.getNumeroPedido).toHaveBeenCalled();
    expect(pedidoRepository.create).toHaveBeenCalled();
  });

  it('should throw ClienteNaoLocalizadoException if cliente is not found', async () => {
    const params = {
      cliente: '123',
      itens: ['item1', 'item2'],
      combos: ['combo1'],
    };

    pedidoRepository.getNumeroPedido.mockResolvedValueOnce(1);

    axiosMock.onGet(`${process.env.CLIENTE_API_URL}/clientes/123`).reply(404);

    await expect(useCase.execute(params)).rejects.toThrow(ClienteNaoLocalizadoException);
  });

  it('should throw GeracaoPagamentoException if payment API call fails', async () => {
    const params = {
      cliente: '123',
      itens: ['item1', 'item2'],
      combos: ['combo1'],
    };

    const clienteData = { nome: 'Fulano', documento: '12345678912' };
    const itensData = { items: [{ id: 'item1' }, { id: 'item2' }] };
    const combosData = { items: [{ id: 'combo1' }] };

    pedidoRepository.getNumeroPedido.mockResolvedValueOnce(1);

    axiosMock.onGet(`${process.env.CLIENTE_API_URL}/clientes/123`).reply(200, clienteData);
    axiosMock.onGet(`${process.env.CARDAPIO_API_URL}/itens`).reply(200, itensData);
    axiosMock.onGet(`${process.env.CARDAPIO_API_URL}/combos`).reply(200, combosData);
    axiosMock.onPost(`${process.env.PAGAMENTO_API_URL}/pagamentos`).reply(500);

    await expect(useCase.execute(params)).rejects.toThrow(GeracaoPagamentoException);
  });
});
