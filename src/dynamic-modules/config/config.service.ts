import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
// import * as fs from 'fs';
import * as path from 'path';
import * as fs from 'fs-extra';
import { CONFIG_OPTIONS } from './constants';
import { ConfigOptions, EnvConfig } from './interfaces';

@Injectable()
export class ConfigService {
  private envConfig: EnvConfig;
  private readonly cwd = process.cwd();

  constructor(@Inject(CONFIG_OPTIONS) private options: ConfigOptions) {
    this.createDotEnv();
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  // 生成文件
  async createDotEnv() {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(
      __dirname,
      '../',
      this.options.folder,
      filePath,
    );

    const trulyDotenvPath = path.resolve(
      this.cwd,
      './src/dynamic-modules/env/development.env',
    );

    // 处理 .env 文件
    await fs.ensureFile(envFile);
    await fs.writeFile(
      envFile,
      await fs.readFile(trulyDotenvPath, { encoding: 'utf-8' }),
    );

    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }
}
