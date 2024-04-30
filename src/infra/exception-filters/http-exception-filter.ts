import { getHttpStatusKeyByValue } from '@/common';
import { DefaultException } from '@/common/exceptions/default.exception';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<DefaultException> {
  private readonly exceptionLogger: Logger;
  constructor() {
    this.exceptionLogger = new Logger(HttpExceptionFilter.name);
  }

  public async catch(
    exception: DefaultException,
    host: ArgumentsHost,
  ): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const code = exception.code ?? getHttpStatusKeyByValue(status);
    const message = exception.message;
    const propertyName = exception.propertyName;
    const error = {
      errors: [
        {
          code,
          propertyName,
          message,
        },
      ],
    };
    this.exceptionLogger.error(exception);
    Logger.error(message, code);
    response.status(status).json(error);
  }
}
