import { createMock } from '@golevelup/nestjs-testing';
import { ConfigService } from '@nestjs/config';
import { BullConfig } from './bull.config';

jest.mock('ioredis', () => require('ioredis-mock'));

describe('BullConfigService', () => {
  const configService = createMock<ConfigService>();

  describe('createSharedConfiguration', () => {
    it('should create redis single client object', async () => {
      configService.get
        .mockReturnValueOnce('redis:config')
        .mockReturnValueOnce(() => true);
      const bullConfigService = new BullConfig(configService);
      const result = await bullConfigService.createSharedConfiguration();
      expect(result).toBeDefined();
      expect(result).toMatchInlineSnapshot(`
        {
          "createClient": [Function],
          "defaultJobOptions": {
            "removeOnComplete": true,
          },
          "prefix": "Pedidos API",
        }
      `);
      expect(result).toHaveProperty('createClient');
      expect(result.createClient('bclient')).toBeDefined();
    });

    it('should create redis cluster client object', async () => {
      configService.get
        .mockReturnValueOnce('redis:config')
        .mockReturnValueOnce(() => false);
      const bullConfigService = new BullConfig(configService);
      const result = await bullConfigService.createSharedConfiguration();
      expect(result).toBeDefined();
      expect(result).toMatchInlineSnapshot(`
        {
          "createClient": [Function],
          "defaultJobOptions": {
            "removeOnComplete": true,
          },
          "prefix": "Pedidos API",
        }
      `);
      expect(result).toHaveProperty('createClient');
      expect(result.createClient('bclient')).toBeDefined();
    });
  });
});
