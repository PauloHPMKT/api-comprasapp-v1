import { HttpStatus } from '@nestjs/common';
import { HttpResponse } from '../http';
import { ServerError } from '../../errors';

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatus.BAD_REQUEST,
  body: error,
});

export const conflict = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatus.CONFLICT,
  body: error,
});

export const serverError = (): HttpResponse<Error> => ({
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  body: new ServerError(),
});

export const created = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: HttpStatus.CREATED,
  body: data,
});
