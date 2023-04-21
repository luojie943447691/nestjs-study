import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as requestIP from 'request-ip';

@Catch()
export class AllException implements ExceptionFilter {
  constructor(
    private readonly logger: Logger,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = {
      headers: req.headers,
      query: req.query,
      body: req.body,
      params: req.params,
      timestamp: new Date().toLocaleString(),
      ip: requestIP.getClientIp(req),
      exception: exception['name'],
      error: exception['response'] || 'Internal Server Error',
    };

    this.logger.error(exception['message'], responseBody);

    httpAdapter.reply(res, responseBody, status);
  }
}
