import { MissingParamError } from '@/shared/errors';
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
        email: '',
        password: 'anypassword',
      },
    };
    const result = await sut.handle(request);
    expect(result.statusCode).toBe(400);
    expect(result.body).toBe(new MissingParamError('email').message);
  });
});
