import { PedidoEntity } from '@/domain/entities';
import { StatusPedido } from '@/domain/enum';
import { ICreatePedido, IFindById, IFindPaginate } from '@/domain/use-cases';
import { IUpdateStatusPedidoUseCase } from '@/domain/use-cases/pedidos/update-status-pedido.use-case';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePedidoDto } from '../dtos';
import { UpdateStatusDto } from '../dtos/pagamento-pedido';
import { AllowAnonymous } from '../middlewares/auth-guard.strategy';
import { PaginacaoDto } from '../dtos/paginacao.dto';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidoController {
  constructor(
    @Inject(ICreatePedido)
    private readonly createPedidoUseCase: ICreatePedido,
    @Inject(IFindById)
    private readonly findPedidoByIdUseCase: IFindById,
    @Inject(IFindPaginate)
    private readonly findPedidoPaginateUseCase: IFindPaginate,
    @Inject(IUpdateStatusPedidoUseCase)
    private readonly updateStatusPedidoUseCase: IUpdateStatusPedidoUseCase,
  ) {}

  @ApiOperation({
    summary:
      "Para clientes que realizarem pedidos de forma anônima, não deverá passar o campo 'cliente' na requisição",
  })
  @UseGuards()
  @AllowAnonymous()
  @ApiSecurity('bearer')
  @Post()
  async create(
    @Body() createPedidoDto: CreatePedidoDto,
  ): Promise<PedidoEntity> {
    return this.createPedidoUseCase.execute(createPedidoDto);
  }

  @ApiQuery({
    name: 'documento',
    required: false,
  })
  @ApiQuery({
    name: 'status',
    enum: StatusPedido,
    type: 'array',
    required: false,
  })
  @ApiQuery({
    name: 'pagina',
    required: false,
  })
  @ApiQuery({
    name: 'limite',
    required: false,
  })
  @UseGuards()
  @AllowAnonymous()
  @ApiSecurity('bearer')
  @Get()
  async findPaginate(
    @Query('documento') documento: string,
    @Query(
      'status',
      new ParseArrayPipe({ optional: true, items: String, separator: ',' }),
    )
    status: Array<StatusPedido>,
    @Query('pagina', new DefaultValuePipe(1), ParseIntPipe) pagina = 1,
    @Query('limite', new DefaultValuePipe(10), ParseIntPipe) limite = 10,
  ): Promise<PaginacaoDto> {
    return this.findPedidoPaginateUseCase.execute({
      documento: documento,
      status: status,
      pagina: pagina,
      limite: limite,
    });
  }

  @UseGuards()
  @AllowAnonymous()
  @ApiSecurity('bearer')
  @ApiParam({ name: 'id' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<PedidoEntity> {
    return this.findPedidoByIdUseCase.execute({ id: id });
  }

  @ApiOperation({
    summary: 'Atualiza o status do pedido (simulação de preparo)',
  })
  @ApiParam({ name: 'idPedido' })
  @Patch(':idPedido/status')
  async updateStatus(
    @Param('idPedido') idPedido: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<PedidoEntity> {
    return this.updateStatusPedidoUseCase.execute({ idPedido, ...updateStatusDto });
  }
}
