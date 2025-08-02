import { BcryptAdapter } from './bcrypt.adapter';

const makeSut = () => {
  const sut = new BcryptAdapter();
  return { sut };
};

describe('BcryptAdapter', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(BcryptAdapter);
    expect(sut).toBeTruthy();
  });
});
