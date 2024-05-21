import { InvalidParameterException } from '@/common/exceptions/invalid-parameter.exception';
import { createMock } from '@golevelup/nestjs-testing';
import { ArgumentsHost } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ValidatorExceptionFilter } from './validator-exception-filter';

describe('ValidatorExceptionFilter', () => {
  const httpArgumentsHostMock = createMock<HttpArgumentsHost>({
    getResponse: () =>
      createMock<Response>({
        status: Number(jest.fn().mockReturnThis()),
        json: jest.fn().mockReturnThis(),
      }),
  });
  const argumentsHostMock = createMock<ArgumentsHost>({
    switchToHttp: jest.fn(() => httpArgumentsHostMock),
  });

  const invalidParameterExceptionMock = createMock<InvalidParameterException>();

  jest.useFakeTimers().setSystemTime(new Date('2022-01-01'));

  it('should be called with valid arguments', async () => {
    const validatorExceptionFilter = new ValidatorExceptionFilter();
    const switchToHttpSpy = jest.spyOn(argumentsHostMock, 'switchToHttp');
    const getResponseSpy = jest.spyOn(httpArgumentsHostMock, 'getResponse');
    await validatorExceptionFilter.catch(
      [invalidParameterExceptionMock],
      argumentsHostMock,
    );
    expect(switchToHttpSpy).toBeCalledTimes(1);
    expect(getResponseSpy).toBeCalledTimes(1);
  });
});
