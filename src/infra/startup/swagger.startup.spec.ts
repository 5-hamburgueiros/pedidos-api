import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';
import { SwaggerStartup } from './swagger.startup';

describe('SwaggerStartup', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({}).compile();
    app = moduleRef.createNestApplication();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('init', () => {
    it('should not throw error while adding swagger into NestApplication', () => {
      const createDocumentSpy = jest.spyOn(SwaggerModule, 'createDocument');
      const setupDocumentSpy = jest.spyOn(SwaggerModule, 'setup');
      const result = SwaggerStartup.init(app);
      expect(result).toBeUndefined();
      expect(createDocumentSpy).toBeCalledTimes(1);
      expect(setupDocumentSpy).toBeCalledTimes(1);
    });
  });
});
