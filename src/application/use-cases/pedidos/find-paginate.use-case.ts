import { PedidoNaoLocalizadoException } from '@/domain/exceptions';
import { IPedidoRepository } from '@/domain/repository';
import { IFindPaginate } from '@/domain/use-cases';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class FindPedidoPaginateUseCase implements IFindPaginate {
  constructor(
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
  ) {}
  async execute(params: IFindPaginate.Params): Promise<IFindPaginate.Result> {
    try {
      const result = await this.pedidoRepository.findPaginate(params);
      if (!result) {
        throw new PedidoNaoLocalizadoException('Pedido não localizado');
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
