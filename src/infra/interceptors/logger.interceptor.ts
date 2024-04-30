import { shouldIgnorePath } from '@/common';
import { CorrelationService } from '@/infra/correlation/correlation-service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  Scope,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: Logger,
    private readonly correlationService: CorrelationService,
  ) {}
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    if (shouldIgnorePath(request.path)) {
      return next.handle();
    }
    const correlationId = this.correlationService.correlationId;
    response.on('finish', async () => {
      const data = context.switchToHttp().getResponse<Response>();
      const { statusCode } = data;
      this.logger.log({
        correlationId,
        request,
        statusCode,
      });
    });

    return next.handle();
  }
}
