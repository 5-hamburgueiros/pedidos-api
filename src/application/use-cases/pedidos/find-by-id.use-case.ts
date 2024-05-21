import { PedidoNaoLocalizadoException } from '@/domain/exceptions';
import { IPedidoRepository } from '@/domain/repository';
import { IFindById } from '@/domain/use-cases';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class FindPedidoByIdUseCase implements IFindById {
  constructor(
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
  ) {}
  async execute(params: IFindById.Params): Promise<IFindById.Result> {
    try {
      const result = await this.pedidoRepository.findById({ id: params.id });
      if (!result) {
        throw new PedidoNaoLocalizadoException('Pedido não localizado');
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
