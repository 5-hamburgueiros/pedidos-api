import { ConfigFactory, ConfigObject } from '@nestjs/config';
import { TypeORMConfig } from './typeorm.config';

export class Config implements IConfig<Config.Result> {
  public readonly name: string = 'default';
  private readonly configs: IConfig[] = [];

  constructor() {
    this.configs.push(new TypeORMConfig());
  }

  get(): Config.Result {
    return this.configs.map((config) => {
      return () => ({
        [config.name || this.name]: config.get(),
      });
    });
  }
}

export interface IConfig<T = any> {
  get(): T;
  readonly name: string;
}

export namespace Config {
  export type Result = ConfigFactory<ConfigObject>[];
}
