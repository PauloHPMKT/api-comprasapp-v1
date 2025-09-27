import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt.adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hashed_value'));
  },
  async compare(): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  },
}));

const salt = 12;
const makeSut = () => {
  const sut = new BcryptAdapter(salt);
  return { sut };
};

describe('BcryptAdapter', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(BcryptAdapter);
    expect(sut).toBeTruthy();
  });

  it('Should call bcript with correct values', async () => {
    const { sut } = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  it('Should return a hash on success', async () => {
    const { sut } = makeSut();
    const hash = await sut.hash('any_value');
    expect(hash).toBe('hashed_value');
  });

  it('Should throw if bcrypt throws', async () => {
    const { sut } = makeSut();
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.hash('any_value');
    await expect(promise).rejects.toThrow();
  });

  it('Should call bcript compare with correct values', async () => {
    const { sut } = makeSut();
    const compareSpy = jest.spyOn(bcrypt, 'compare');
    await sut.compare('any_value', 'hashed_value');
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'hashed_value');
  });

  it('Should return true when compare succeeds', async () => {
    const { sut } = makeSut();
    const isValid = await sut.compare('any_value', 'hashed_value');
    expect(isValid).toBe(true);
  });

  it('Should return false when compare fails', async () => {
    const { sut } = makeSut();
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementationOnce(() => Promise.resolve(false));
    const isValid = await sut.compare('any_value', 'hashed_value');
    expect(isValid).toBe(false);
  });
});
