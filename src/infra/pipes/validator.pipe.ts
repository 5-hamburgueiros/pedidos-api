import { InvalidParameterException } from '@/common/exceptions/invalid-parameter.exception';
import {
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

export class ValidatorPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super(options);
    //super.exceptionFactory = (errors) => this.factory(errors);
  }

  factory(
    errors: ValidationError[],
    parentProperty: string = null,
    accumulator: InvalidParameterException[] = [],
  ) {
    for (const error of errors) {
      const { property, constraints, children } = error;

      if (constraints) {
        const mappedError = Object.values(constraints).map(
          (message: string) => {
            return new InvalidParameterException(
              'INVALID_PARAMETER',
              message,
              parentProperty ?? property,
            );
          },
        );

        accumulator.push(...mappedError);
      }

      if (children?.length) {
        this.factory(children, property, accumulator);
      }
    }
    return accumulator;
  }
}
