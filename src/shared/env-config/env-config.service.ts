import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './protocols/env-config';

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private readonly configService: ConfigService) {}

  getEnv<T = string>(env: string): T {
    const value = this.configService.get<T>(env);

    if (value === undefined || value === null) {
      throw new Error(`Environment variable ${env} is not defined`);
    }

    return value as T;
  }
}
