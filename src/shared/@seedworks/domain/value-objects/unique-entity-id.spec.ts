import { InvalidIdError } from '@/shared/errors/invalid-id-error';
import UniqueEntityId from './unique-entity-id';

describe('UniqueEntityId', () => {
  it('should throw an error when hex string is invalid', () => {
    expect(() => new UniqueEntityId('invalid_id')).toThrow(
      new InvalidIdError('id must be a valid unique entity id'),
    );
  });
});
