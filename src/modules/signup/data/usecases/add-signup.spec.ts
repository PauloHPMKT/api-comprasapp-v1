import { UserAlreadyExistsError } from '@/shared/errors';
import { IsExistsUserRepositoryPort } from '../../../user/domain/ports/is-exists-user.repository';
import { AddSignupUseCase } from './add-signup';

const makeIsExistsUserRepository = (): IsExistsUserRepositoryPort => {
  class IsExistsUserRepositoryStub implements IsExistsUserRepositoryPort {
    async exists(email: string): Promise<boolean> {
      console.log(email);
      return false;
    }
  }
  return new IsExistsUserRepositoryStub();
};

const makeSut = (): SutTypes => {
  const isExistsUserRepositoryStub = makeIsExistsUserRepository();
  const sut = new AddSignupUseCase(isExistsUserRepositoryStub);
  return { sut, isExistsUserRepositoryStub };
};

type SutTypes = {
  sut: AddSignupUseCase;
  isExistsUserRepositoryStub: IsExistsUserRepositoryPort;
};

describe('AddSignupUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(AddSignupUseCase);
  });

  it('should throw an error if user already exists', async () => {
    const { sut, isExistsUserRepositoryStub } = makeSut();
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      confirmationPassword: 'anypassword',
    };
    jest
      .spyOn(isExistsUserRepositoryStub, 'exists')
      .mockResolvedValueOnce(true);
    await expect(sut.execute(params)).rejects.toThrow(UserAlreadyExistsError);
  });

  it('should call IsExistsUserRepositoryPort with correct email', async () => {
    const { sut, isExistsUserRepositoryStub } = makeSut();
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      confirmationPassword: 'anypassword',
    };
    const existsSpy = jest.spyOn(isExistsUserRepositoryStub, 'exists');
    await sut.execute(params);
    expect(existsSpy).toHaveBeenCalledWith('anyemail@mail.com');
  });

  it('should thorw an error if password not match confirmationPassword', async () => {
    const { sut } = makeSut();
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      confirmationPassword: 'anypassword2',
    };
    await expect(sut.execute(params)).rejects.toThrow(
      'Password and confirmation password do not match',
    );
  });
});
