import { Injectable, Inject } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { LoggerHelper } from 'src/log/LogHelper';

@Injectable()
export class HttpService<T extends AxiosInstance = AxiosInstance> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;

  constructor(private readonly logger: LoggerHelper) {}

  async fetchData(url: string): Promise<any> {
    this.logger.log(`Fetching data from ${url}`);
    // use the injected `httpClient` instance to fetch data
    const response = await this.httpClient.get(url);
    return response.data;
  }
}
