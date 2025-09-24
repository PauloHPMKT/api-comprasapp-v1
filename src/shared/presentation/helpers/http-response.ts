import { HttpStatus } from '@nestjs/common';
import { HttpResponse } from '../http';
import { ServerError } from '../../errors';

export const badRequest = (error: Error): HttpResponse<string> => ({
  statusCode: HttpStatus.BAD_REQUEST,
  body: error.message,
});

export const conflict = (error: Error): HttpResponse<string> => ({
  statusCode: HttpStatus.CONFLICT,
  body: error.message,
});

export const serverError = (error?: string): HttpResponse<string> => ({
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  body: new ServerError(error).message,
});

export const created = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: HttpStatus.CREATED,
  body: data,
});

export const ok = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: HttpStatus.OK,
  body: data,
});
