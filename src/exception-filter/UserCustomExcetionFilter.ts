import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from './HttpExceptionFilter';
import { UserCustomExcetion } from './UserCustomException';

@Catch(UserCustomExcetion)
export class UserCustomExcetionFilter implements HttpExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // TODO: 比如打印日志
    console.log('enter to custom excetion');

    res.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
