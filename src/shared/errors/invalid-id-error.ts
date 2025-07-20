export class InvalidIdError extends Error {
  constructor(message?: string) {
    super(message || 'id must be a valid unique entity id');
    this.name = 'InvalidIdError';
  }
}
