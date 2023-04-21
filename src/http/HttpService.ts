import { Injectable, Inject } from '@nestjs/common';
import { AxiosInstance } from 'axios';

@Injectable()
export class HttpService<T extends AxiosInstance = AxiosInstance> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;

  async fetchData(url: string): Promise<any> {
    // use the injected `httpClient` instance to fetch data
    const response = await this.httpClient.get(url);
    return response.data;
  }
}
