import { SigninUsecase } from '../signin';
import { makeSigninUsecaseSut } from './__mocks__/signin-test-suite';

describe('SigninUsecase', () => {
  it('should be defined', async () => {
    const { sut } = await makeSigninUsecaseSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(SigninUsecase);
  });

  it('should call getUserIdByEmailRepository with correct email', async () => {
    const { sut, findUserIdByEmailStub } = await makeSigninUsecaseSut();
    const findUserIdByEmailSpy = jest.spyOn(
      findUserIdByEmailStub,
      'findByEmail',
    );
    const params = {
      email: 'any_email',
      password: 'any_password',
    };
    const promise = sut.execute(params);
    await expect(promise).resolves.not.toThrow();
    expect(findUserIdByEmailSpy).toHaveBeenCalledWith('any_email');
  });

  it('should throw if user is not found', async () => {
    const { sut, findUserIdByEmailStub } = await makeSigninUsecaseSut();
    jest.spyOn(findUserIdByEmailStub, 'findByEmail').mockReturnValueOnce(null);
    const params = {
      email: 'invalid_email',
      password: 'invalid_password',
    };
    await expect(sut.execute(params)).rejects.toThrow('User not found');
  });

  it('should call validateUserCredentials with correct values', async () => {
    const { sut, validateUserCredentialsStub } = await makeSigninUsecaseSut();
    const validateUserCredentialsSpy = jest.spyOn(
      validateUserCredentialsStub,
      'validate',
    );
    const params = {
      email: 'any_email',
      password: 'any_password',
    };
    const promise = sut.execute(params);
    await expect(promise).resolves.not.toThrow();
    expect(validateUserCredentialsSpy).toHaveBeenCalledWith({
      email: 'any_email',
      password: 'any_password',
    });
  });

  it('should throw if validateUserCredentials throws (invalid credentials)', async () => {
    const { sut, validateUserCredentialsStub } = await makeSigninUsecaseSut();
    const error = new Error('Invalid credentials');
    jest
      .spyOn(validateUserCredentialsStub, 'validate')
      .mockImplementationOnce(() => {
        throw error;
      });
    const params = {
      email: 'invalid_email',
      password: 'invalid_password',
    };
    await expect(sut.execute(params)).rejects.toThrow('Invalid credentials');
  });
});
