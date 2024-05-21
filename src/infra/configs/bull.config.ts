import { APP_NAME } from '@/common';
import { SharedBullConfigurationFactory } from '@nestjs/bull';
import { CacheModuleOptions, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueueOptions } from 'bull';
import redis, { Cluster, Redis } from 'ioredis';
import { environment } from './environment';

@Injectable()
export class BullConfig implements SharedBullConfigurationFactory {
  private readonly logger = new Logger(BullConfig.name);
  private host: string;
  private port: number;
  private isRedisCluster: boolean;

  constructor(private readonly configService: ConfigService) {
    const redisConfig = this.configService.get<CacheModuleOptions>('redis');
    this.host = redisConfig.host;
    this.port = redisConfig.port;
    this.isRedisCluster = !environment.isDevelopment();
    this.logger.debug(`Retrieve redis config`);
  }
  createSharedConfiguration(): QueueOptions | Promise<QueueOptions> {
    return {
      prefix: APP_NAME,
      defaultJobOptions: { removeOnComplete: true },
      createClient: (): any => {
        if (this.isRedisCluster) {
          return this.clusterRedisInstance();
        }
        return this.singleRedisInstance();
      },
    };
  }

  private clusterRedisInstance(): Cluster {
    this.logger.debug(`Using redis cluster`);
    return new redis.Cluster(
      [
        {
          host: this.host,
          port: this.port,
        },
      ],
      {
        enableReadyCheck: false,
      },
    );
  }

  private singleRedisInstance(): Redis {
    this.logger.debug(`Using redis single`);
    return new redis({
      host: this.host,
      port: this.port,
      enableReadyCheck: false,
      maxRetriesPerRequest: null,
    });
  }
}
