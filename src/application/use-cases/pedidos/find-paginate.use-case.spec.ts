import { FindPedidoPaginateUseCase } from './find-paginate.use-case';
import { PedidoNaoLocalizadoException } from '@/domain/exceptions';
import { IPedidoRepository } from '@/domain/repository';
import { InternalServerErrorException } from '@nestjs/common';

// Mock da dependência IPedidoRepository
const mockPedidoRepository: IPedidoRepository = {
  findPaginate: jest.fn(),
};

const mockPaginacao = {
  data: [
    { id: 'pedido_id_1', valor: 100 },
    { id: 'pedido_id_2', valor: 200 },
  ],
  total: 2,
  pagina: 1,
  limite: 10,
};

describe('FindPedidoPaginateUseCase', () => {
  let findPedidoPaginateUseCase: FindPedidoPaginateUseCase;

  beforeEach(() => {
    findPedidoPaginateUseCase = new FindPedidoPaginateUseCase(mockPedidoRepository);
  });

  it('deve encontrar pedidos com sucesso', async () => {
    mockPedidoRepository.findPaginate.mockResolvedValue(mockPaginacao);

    const resultadoPaginado = await findPedidoPaginateUseCase.execute({ pagina: 1, limite: 10 });

    expect(resultadoPaginado.data).toHaveLength(2);
    expect(resultadoPaginado.total).toBe(2);
    expect(resultadoPaginado.pagina).toBe(1);
    expect(resultadoPaginado.limite).toBe(10);
  });


  it('deve lançar uma exceção se ocorrer um erro interno', async () => {
    mockPedidoRepository.findPaginate.mockRejectedValue(new Error('Erro interno'));

    await expect(
      findPedidoPaginateUseCase.execute({ pagina: 1, limite: 10 }),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
