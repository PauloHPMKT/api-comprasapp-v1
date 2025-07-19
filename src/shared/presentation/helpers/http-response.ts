import { HttpStatus } from '@nestjs/common';
import { HttpResponse } from '../http';

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatus.BAD_REQUEST,
  body: error,
});
