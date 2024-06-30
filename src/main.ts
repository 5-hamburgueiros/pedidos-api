import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { CorrelationIdMiddleware } from './infra/middlewares/correlation/correlation.middleware';
import { ValidatorPipe } from './infra/pipes/validator.pipe';
import { SwaggerStartup } from './infra/startup';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(app.get(CorrelationIdMiddleware).use);
  app.useGlobalPipes(new ValidatorPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('APP_PORT');

  SwaggerStartup.init(app, port);
  await app.listen(Number(port));
}
bootstrap();
