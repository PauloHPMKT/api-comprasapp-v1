import { ValidateUserService } from '../validate-user.service';
import { makeValidateUserSut } from './__mocks__/validate-user-test-suite';

describe('ValidateUserService', () => {
  it('should be defined', async () => {
    const { sut } = await makeValidateUserSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(ValidateUserService);
  });

  it('should call getAccountByUserId with correct values', async () => {
    const { sut, getAccountByUserIdRepositoryPortStub } =
      await makeValidateUserSut();
    const params = {
      id: 'valid_user_id',
      password: 'any_password',
    };
    const getAccountByUserIdRepositoryPortSpy = jest.spyOn(
      getAccountByUserIdRepositoryPortStub,
      'getAccount',
    );
    await sut.validate(params);
    expect(getAccountByUserIdRepositoryPortSpy).toHaveBeenCalledWith(
      'valid_user_id',
    );
  });
});
