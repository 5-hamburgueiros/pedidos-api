
import { PedidoNaoLocalizadoException } from '@/domain/exceptions';
import { IPedidoRepository } from '@/domain/repository';
import { InternalServerErrorException } from '@nestjs/common';
import { FindPedidoByIdUseCase } from './find-by-id.use-case';

// Mock da dependência IPedidoRepository
const mockPedidoRepository: Partial<IPedidoRepository> = {
  findById: jest.fn(),
};

const mockPedido = { id: 'pedido_id_1', valor: 100 };

describe('FindPedidoByIdUseCase', () => {
  let findPedidoByIdUseCase: FindPedidoByIdUseCase;

  beforeEach(() => {
    findPedidoByIdUseCase = new FindPedidoByIdUseCase(mockPedidoRepository as IPedidoRepository);
  });

  it('deve encontrar um pedido com sucesso', async () => {
    (mockPedidoRepository.findById as jest.Mock).mockResolvedValue(mockPedido);

    const result = await findPedidoByIdUseCase.execute({ id: 'pedido_id_1' });

    expect(result).toEqual(mockPedido);
    expect(mockPedidoRepository.findById).toHaveBeenCalledWith({ id: 'pedido_id_1' });
  });


  it('deve lançar uma exceção se ocorrer um erro interno', async () => {
    (mockPedidoRepository.findById as jest.Mock).mockRejectedValue(new Error('Erro interno'));

    await expect(
      findPedidoByIdUseCase.execute({ id: 'pedido_id_1' }),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
