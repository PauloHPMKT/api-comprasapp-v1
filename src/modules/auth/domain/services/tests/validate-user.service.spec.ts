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

  it('should calls compareIfPasswordIsValid with correct values', async () => {
    const { sut, compareIfPasswordIsValidStub } = await makeValidateUserSut();
    const params = {
      id: 'valid_user_id',
      password: 'any_password',
    };
    const compareIfPasswordIsValidSpy = jest.spyOn(
      compareIfPasswordIsValidStub,
      'compare',
    );
    await sut.validate(params);
    expect(compareIfPasswordIsValidSpy).toHaveBeenCalledWith(
      'any_password',
      'hashed_password',
    );
  });

  it('should return a valid account data withoun password', async () => {
    const { sut } = await makeValidateUserSut();
    const params = {
      id: 'valid_user_id',
      password: 'any_password',
    };
    const account = await sut.validate(params);
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      avatar: null,
      accountId: 'valid_account_id',
      plan: 'free',
      createdAt: new Date('2025-09-27T01:56:39.666Z'),
    });
  });
});
