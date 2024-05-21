import { CorrelationService } from '@/infra/correlation/correlation-service';
import { createMock } from '@golevelup/nestjs-testing';
import { ExecutionContext, Logger } from '@nestjs/common';
import { CallHandler, HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { LoggerInterceptor } from './logger.interceptor';

const mockRequest = createMock<Request>();
const httpArgumentsHostMockFactory = (): HttpArgumentsHost => {
  return createMock<HttpArgumentsHost>({
    getRequest: () => mockRequest,
    getResponse: () =>
      createMock<Response>({
        on(event, listener) {
          if (event === 'finish') {
            return listener.apply(this);
          }
          return this;
        },
      }),
    getNext: (): any => {
      return {};
    },
  });
};
const executionContextMockFactory = (
  httpArgumentsHostMock: HttpArgumentsHost,
): ExecutionContext => {
  return createMock<ExecutionContext>({
    switchToHttp(): HttpArgumentsHost {
      return httpArgumentsHostMock;
    },
  });
};

const observableMockFactory = (): Observable<any> => {
  return of('');
};

const callHandlerMockFactory = (
  observableMock: Observable<any>,
): CallHandler => {
  return createMock<CallHandler>({
    handle() {
      return observableMock;
    },
  });
};

const loggerMock = createMock<Logger>({
  log: () => Promise.resolve(),
});
const correlationMock = createMock<CorrelationService>();

describe('LoggerInterceptor', () => {
  it('should call logger and then next', async () => {
    const interceptor = new LoggerInterceptor(loggerMock, correlationMock);
    const httpArgumentsHostMock = httpArgumentsHostMockFactory();
    const executionContextMock = executionContextMockFactory(
      httpArgumentsHostMock,
    );
    const observableMock = observableMockFactory();
    const callHandlerMock = callHandlerMockFactory(observableMock);
    const callHandlerMockSpy = jest.spyOn(callHandlerMock, 'handle');
    const loggerInterceptorSpy = jest.spyOn(interceptor, 'intercept');
    const switchToHttpMockSpy = jest.spyOn(
      executionContextMock,
      'switchToHttp',
    );
    const getRequestMockSpy = jest.spyOn(httpArgumentsHostMock, 'getRequest');
    const getResponseMockSpy = jest.spyOn(httpArgumentsHostMock, 'getResponse');
    const loggerMockSpy = jest.spyOn(loggerMock, 'log');
    interceptor.intercept(executionContextMock, callHandlerMock).subscribe({
      complete: () => {
        expect(loggerInterceptorSpy).toHaveBeenCalledTimes(1);
        expect(loggerInterceptorSpy).toHaveBeenCalledWith(
          executionContextMock,
          callHandlerMock,
        );
        expect(switchToHttpMockSpy).toBeCalled();
        expect(switchToHttpMockSpy).toHaveReturnedWith(httpArgumentsHostMock);
        expect(getRequestMockSpy).toHaveBeenCalledTimes(1);
        expect(getResponseMockSpy).toHaveBeenCalledTimes(2);
        expect(callHandlerMockSpy).toHaveBeenCalledTimes(1);
        expect(loggerMockSpy).toHaveBeenCalledTimes(1);
        expect(callHandlerMockSpy).toHaveReturnedWith(observableMock);
      },
    });
  });
  it('should not call logger when path is /hc and must call next', async () => {
    mockRequest.path = '/hc';
    const interceptor = new LoggerInterceptor(loggerMock, correlationMock);
    const httpArgumentsHostMock = httpArgumentsHostMockFactory();
    const executionContextMock = executionContextMockFactory(
      httpArgumentsHostMock,
    );
    const observableMock = observableMockFactory();
    const callHandlerMock = callHandlerMockFactory(observableMock);
    const callHandlerMockSpy = jest.spyOn(callHandlerMock, 'handle');
    const loggerInterceptorSpy = jest.spyOn(interceptor, 'intercept');
    const switchToHttpMockSpy = jest.spyOn(
      executionContextMock,
      'switchToHttp',
    );
    const getRequestMockSpy = jest.spyOn(httpArgumentsHostMock, 'getRequest');
    const getResponseMockSpy = jest.spyOn(httpArgumentsHostMock, 'getResponse');
    interceptor.intercept(executionContextMock, callHandlerMock).subscribe({
      complete: () => {
        expect(loggerInterceptorSpy).toHaveBeenCalledTimes(1);
        expect(loggerInterceptorSpy).toHaveBeenCalledWith(
          executionContextMock,
          callHandlerMock,
        );
        expect(switchToHttpMockSpy).toBeCalled();
        expect(switchToHttpMockSpy).toHaveReturnedWith(httpArgumentsHostMock);
        expect(getRequestMockSpy).toHaveBeenCalledTimes(1);
        expect(getResponseMockSpy).toHaveBeenCalledTimes(2);
        expect(callHandlerMockSpy).toHaveBeenCalledTimes(1);
        expect(callHandlerMockSpy).toHaveReturnedWith(observableMock);
      },
    });
  });
});
