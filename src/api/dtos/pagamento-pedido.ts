import { StatusPedido } from '@/domain/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({
    description: 'Status do pedido',
    example: 'PAGO',
    enum: StatusPedido,
  })
  @IsEnum(StatusPedido)
  @IsString()
  status: StatusPedido;
}
