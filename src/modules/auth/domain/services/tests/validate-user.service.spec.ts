import { ValidateUserService } from '../validate-user.service';
import { makeValidateUserSut } from './__mocks__/validate-user-test-suite';

describe('ValidateUserService', () => {
  it('should be defined', async () => {
    const { sut } = await makeValidateUserSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(ValidateUserService);
  });
});
