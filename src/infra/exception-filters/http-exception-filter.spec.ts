import { DefaultException } from '@/common/exceptions/default.exception';
import { ArgumentsHost, ContextType, HttpStatus, Logger } from '@nestjs/common';
import {
  HttpArgumentsHost,
  RpcArgumentsHost,
  WsArgumentsHost,
} from '@nestjs/common/interfaces';
import { HttpExceptionFilter } from './http-exception-filter';

describe('HttpExceptionFilter', () => {
  const httpArgumentsHostMockFactory = (): HttpArgumentsHost => {
    return {
      getRequest: () => {
        throw new Error('Method not implemented.');
      },
      getResponse: (): any => {
        return {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };
      },
      getNext: () => {
        throw new Error('Method not implemented.');
      },
    };
  };
  const argumentHostMockFactory = (
    httpArgumentsHostMock: HttpArgumentsHost,
  ): ArgumentsHost => {
    class ArgumentsHostMock implements ArgumentsHost {
      getArgs<T extends any[] = any[]>(): T {
        throw new Error('Method not implemented.');
      }
      getArgByIndex<T = any>(): T {
        throw new Error('Method not implemented.');
      }
      switchToRpc(): RpcArgumentsHost {
        throw new Error('Method not implemented.');
      }
      switchToHttp(): HttpArgumentsHost {
        return httpArgumentsHostMock;
      }
      switchToWs(): WsArgumentsHost {
        throw new Error('Method not implemented.');
      }
      getType<TContext extends string = ContextType>(): TContext {
        throw new Error('Method not implemented.');
      }
    }
    return new ArgumentsHostMock();
  };
  const defaultException = new DefaultException(
    'TEST',
    'test message',
    HttpStatus.BAD_REQUEST,
  );

  jest.useFakeTimers().setSystemTime(new Date('2022-01-01'));

  it('should be called with correct arguments', async () => {
    const httpArgumentsHostMock = httpArgumentsHostMockFactory();
    const argumentHostMock = argumentHostMockFactory(httpArgumentsHostMock);
    const httpExceptionFilter = new HttpExceptionFilter();
    const switchToHttpSpy = jest.spyOn(argumentHostMock, 'switchToHttp');
    const getResponseSpy = jest.spyOn(httpArgumentsHostMock, 'getResponse');
    const getStatusSpy = jest.spyOn(defaultException, 'getStatus');
    const loggerErrorSpy = jest.spyOn(Logger, 'error');
    await httpExceptionFilter.catch(defaultException, argumentHostMock);
    expect(switchToHttpSpy).toBeCalledTimes(1);
    expect(getResponseSpy).toBeCalledTimes(1);
    expect(getStatusSpy).toBeCalledTimes(1);
    expect(loggerErrorSpy).toBeCalledTimes(1);
    expect(loggerErrorSpy).toHaveBeenCalledWith(
      defaultException.message,
      defaultException.code,
    );
  });
});
