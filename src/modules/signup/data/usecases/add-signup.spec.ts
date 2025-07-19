import { AddSignupUseCase } from './add-signup';

const makeSut = (): { sut: AddSignupUseCase } => {
  const sut = new AddSignupUseCase();
  return { sut };
};

describe('AddSignupUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(AddSignupUseCase);
  });
});
