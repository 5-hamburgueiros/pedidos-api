import { InvalidParameterException } from '@/common/exceptions/invalid-parameter.exception';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(Array<InvalidParameterException>)
export class ValidatorExceptionFilter implements ExceptionFilter {
  public async catch(
    exceptions: InvalidParameterException[],
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionsGroupedByPropertyName = exceptions.reduce(
      (group, exception) => ({
        ...group,
        [exception.propertyName]: {
          propertyName: exception.propertyName,
          code: exception.code,
          message: [
            ...(group[exception.propertyName]?.message ?? []),
            exception.message,
          ],
        },
      }),
      {},
    );
    const errors = Object.values(exceptionsGroupedByPropertyName).map(
      ({ propertyName, code, message }) => ({
        code,
        propertyName,
        message,
      }),
    );
    response.status(400).json({
      errors,
    });
  }
}
