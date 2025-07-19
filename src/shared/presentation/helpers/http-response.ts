import { HttpStatus } from '@nestjs/common';
import { HttpResponse } from '../http';
import { ServerError } from '../errors/server-error';

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatus.BAD_REQUEST,
  body: error,
});

export const unprocessableEntity = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  body: error,
});

export const serverError = (): HttpResponse<Error> => ({
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  body: new ServerError(),
});
