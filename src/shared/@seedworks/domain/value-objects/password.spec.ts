import { Password } from './Password';

const makeSut = (): Password => {
  return new Password();
};

describe('Password Value Object', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(Password);
  });
});
