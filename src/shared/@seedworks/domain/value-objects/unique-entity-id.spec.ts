import { InvalidIdError } from '@/shared/errors/invalid-id-error';
import UniqueEntityId from './unique-entity-id';

describe('UniqueEntityId', () => {
  it('should throw an error when hex string is invalid', () => {
    expect(() => new UniqueEntityId('invalid_id')).toThrow(
      new InvalidIdError('id must be a valid unique entity id'),
    );
  });

  it('should test if validate method is not called', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    expect(validateSpy).not.toHaveBeenCalled();
  });

  it('should create a valid UniqueEntityId with a random id', () => {
    const uniqueEntityId = new UniqueEntityId('');
    expect(uniqueEntityId.id).toMatch(/^[0-9a-f]{24}$/i);
    expect(uniqueEntityId).toBeInstanceOf(UniqueEntityId);
  });

  it('sould test if validate method was called once', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidIdError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalled();
  });
});
