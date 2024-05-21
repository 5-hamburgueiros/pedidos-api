import { PedidoEntity } from '@/domain/entities';
import { IPedidoRepository } from '@/domain/repository';
import { PedidoModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import * as mongodb from 'mongodb';
import { ClientGrpcProxy } from '@nestjs/microservices';

@Injectable()
export class PedidoRepositoryTypeOrm implements IPedidoRepository {
  constructor(
    @InjectRepository(PedidoModelTypeOrm)
    private readonly pedidoRepository: Repository<PedidoModelTypeOrm>,
  ) {}
  async findById(
    params: IPedidoRepository.FindById.Params,
  ): Promise<IPedidoRepository.FindById.Result> {
    const pedido = await this.pedidoRepository.findOneBy({
      idPedido: params.id ,
    });
    return pedido as any;
  }

  async findPaginate(
    params: IPedidoRepository.FindPaginate.Params,
  ): Promise<IPedidoRepository.FindPaginate.Result> {
    console.log(params)
    const take = params.limite;
    const skip = (params.pagina - 1) * take;
    const whereConditions: any = {};
    if (params.status && params.status.length > 0) {
      whereConditions['status'] =  {$in: params.status};
    }

    if (params.documento) {
      whereConditions['cliente.documento'] = params.documento;
    }
    console.log(whereConditions)
    const pedidos = await this.pedidoRepository.findAndCount({
      where: whereConditions,
      take: take,
      skip: skip,
    });
    
    const retorno = {
      pedidos: pedidos[0],
      meta: {
        total: pedidos[1],
        limite: take,
        pagina: params.pagina,
      }
    }
    return retorno as any;
  }


  create(params: IPedidoRepository.Create.Params): Promise<PedidoEntity> {
    return this.pedidoRepository.save(params.pedido);
  }

  updatePayment(
    params: IPedidoRepository.Create.Params,
  ): Promise<UpdateResult> {
    return this.pedidoRepository.update(
      { idPedido: params.pedido.idPedido },
      params.pedido,
    );
  }

  async getNumeroPedido(): Promise<number> {
    const numeroPedido = await this.pedidoRepository.count();
    return numeroPedido + 1;
  }
}
