import { UnprocessableEntityException } from '@nestjs/common';

export class UserAlreadyExistsError extends UnprocessableEntityException {
  constructor(message?: string) {
    super(message || `User already exists`);
    this.name = 'UserAlreadyExistsError';
  }
}
