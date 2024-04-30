import { typeOrmEntities } from '@/common/typeorm.models';
import { Config } from '@/infra/configs/config';
import { CorrelationService } from '@/infra/correlation/correlation-service';
import { HttpExceptionFilter } from '@/infra/exception-filters/http-exception-filter';
import { ValidatorExceptionFilter } from '@/infra/exception-filters/validator-exception-filter';
import { CorrelationIdMiddleware } from '@/infra/middlewares/correlation/correlation.middleware';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from '../health/health.module';
import { PedidoModule } from '../pedido/pedido.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: new Config().get(),
    }),
    TypeOrmModule.forFeature(typeOrmEntities),
    HealthModule,

    // BullModule.forRootAsync({
    //   useClass: BullConfig, // deve ter o redis para funcionar
    // }),
    {
      module: DatabaseModule,
      global: true,
    },
    PedidoModule,
  ],
  providers: [
    CorrelationService,
    CorrelationIdMiddleware,
    {
      provide: APP_FILTER,
      useClass: ValidatorExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [CorrelationService],
})
export class AppModule {}
