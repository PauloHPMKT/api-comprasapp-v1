import { MissingParamError, ServerError } from '@/shared/errors';
import { AuthController } from '../auth.controller';
import { makeAuthControllerSut } from './__mocks__/auth.controller-test-suite';

describe('AuthController', () => {
  it('should be defined', async () => {
    const { sut } = await makeAuthControllerSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(AuthController);
  });

  it('should return badRequest if no email is provided', async () => {
    const { sut } = await makeAuthControllerSut();
    const request = {
      body: {
        email: '',
        password: 'anypassword',
      },
    };
    const result = await sut.handle(request);
    expect(result.statusCode).toBe(400);
    expect(result.body).toBe(new MissingParamError('email').message);
  });

  it('should return badRequest if no password is provided', async () => {
    const { sut } = await makeAuthControllerSut();
    const request = {
      body: {
        email: 'valid_email@mail.com',
        password: '',
      },
    };
    const result = await sut.handle(request);
    expect(result.statusCode).toBe(400);
    expect(result.body).toBe(new MissingParamError('password').message);
  });

  it('show should call Signin with correct params', async () => {
    const { sut, signinStub } = await makeAuthControllerSut();
    const executeSpy = jest.spyOn(signinStub, 'execute');
    const request = {
      body: {
        email: 'valid_email@mail.com',
        password: 'anypassword',
      },
    };
    await sut.handle(request);
    expect(executeSpy).toHaveBeenCalledWith({
      email: 'valid_email@mail.com',
      password: 'anypassword',
    });
  });

  it('should throw a server error if Signin throws', async () => {
    const { sut, signinStub } = await makeAuthControllerSut();
    jest.spyOn(signinStub, 'execute').mockImplementationOnce(() => {
      throw new Error('Internal server error');
    });
    const request = {
      body: {
        email: 'valid_email@mail.com',
        password: 'anypassword',
      },
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError().message);
  });
});
