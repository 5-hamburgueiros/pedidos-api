import { IdGenerator } from '@/common';
import { PedidoEntity } from '@/domain/entities';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  isNumber,
} from 'class-validator';

export class PaginacaoDto {
  @ApiProperty({
    description: 'Lista dos Pedidos',
    required: true,
  })
  @IsObject()
  pedidos: PedidoEntity[];

  @ApiProperty({
    description: 'Dados meta para paginacao',
    required: true,
  })
  @IsObject()
  meta: MetaDto;
}

export class MetaDto {
  @ApiProperty({
    description: 'Quantidade de Registros encontrados',
    example: 10,
    required: true,
  })
  @IsNumber()
  total: number;

  @ApiProperty({
    description: 'Quantidade de registros para ser retornado',
    example: 2,
    required: true,
  })
  @IsNumber()
  limite: number;

  @ApiProperty({
    description: 'Pagina Atual',
    example: 1,
    required: true,
  })
  @IsNumber()
  pagina: number;
}
