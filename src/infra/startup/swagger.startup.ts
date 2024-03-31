import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const { npm_package_version: VERSION = '0.1.0', NODE_ENV } = process.env;
export class SwaggerStartup {
  static init(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Tech Challenge - Backend')
      .setExternalDoc('Exportar documentação', '/swagger-json')
      .setDescription('Sistema de gestão de pedidos')
      .addBearerAuth()
      .setVersion(VERSION);

    if (NODE_ENV == 'production') {
      config.addServer(
        'http://a06c69a4a4a89422aab39ed7f596ecea-335050858.us-east-1.elb.amazonaws.com',
        'AWS EKS',
      );
      config.addServer(
        'http://localhost:30001',
        'Production server with kubernetes locally',
      );
      config.addServer(
        'http://localhost:3333',
        'Production server with docker',
      );
    } else {
      config.addServer('http://localhost:3000', 'Development server');
    }

    const document = SwaggerModule.createDocument(app, config.build());
    SwaggerModule.setup('swagger', app, document);
  }
}
