import { AuthController } from '../auth.controller';
import { makeAuthControllerSut } from './__mocks__/auth.controller-test-suite';

describe('AuthController', () => {
  it('should be defined', async () => {
    const { sut } = await makeAuthControllerSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(AuthController);
  });
});
