import { BadRequestException } from '@nestjs/common';

export class MissingParamError extends BadRequestException {
  constructor(paramName: string) {
    super(`Missing param ${paramName}`);
  }
}
