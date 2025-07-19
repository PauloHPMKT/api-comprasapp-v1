import { InternalServerErrorException } from '@nestjs/common';

export class ServerError extends InternalServerErrorException {
  constructor(message?: string) {
    super(message || 'Internal server error');
    this.name = 'ServerError';
  }
}
