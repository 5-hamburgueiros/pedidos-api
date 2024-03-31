import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app/app.module';
import { SwaggerStartup } from '@/infra/startup/swagger.startup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerStartup.init(app);
  await app.listen(80);
}
bootstrap();
