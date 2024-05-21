import { IdGenerator } from '@/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePedidoDto {
  @ApiProperty({
    description: 'Documento do cliente',
    example: '12345678910',
    required: false,
  })
  @IsOptional()
  @IsString()
  cliente: string;

  @ApiProperty({
    description: 'Id dos itens que fazem parte do pedido',
    required: false,
    example: [IdGenerator.Generate()],
  })
  @IsOptional()
  @IsArray()
  itens: string[];

  @ApiProperty({
    description: 'Id dos Combos que fazem parte do pedido',
    required: false,
    example: [IdGenerator.Generate()],
  })
  @IsOptional()
  @IsArray()
  combos: string[];
}
