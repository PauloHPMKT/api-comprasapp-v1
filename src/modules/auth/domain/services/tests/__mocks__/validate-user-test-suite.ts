import { Test, TestingModule } from '@nestjs/testing';
import { ValidateUserService } from '../../validate-user.service';
import { makeValidateUserServiceMock } from './validate-user.mocks';
import { getAccountByUserIdRepositoryPort } from '../../../../data/repositories/get-account-by-user-is.repository';

export const makeValidateUserSut = async (): Promise<SutTypes> => {
  const { getAccountByUserIdRepositoryPortStub, compareIfPasswordIsValidStub } =
    makeValidateUserServiceMock();
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [],
    providers: [
      ValidateUserService,
      {
        provide: 'GET_ACCOUNT_BY_USER_ID_REPOSITORY_PORT',
        useValue: getAccountByUserIdRepositoryPortStub,
      },
      {
        provide: 'COMPARE_IF_PASSWORD_IS_VALID',
        useValue: compareIfPasswordIsValidStub,
      },
    ],
  }).compile();

  const sut = moduleRef.get<ValidateUserService>(ValidateUserService);
  return {
    sut,
    getAccountByUserIdRepositoryPortStub,
    compareIfPasswordIsValidStub,
  };
};

type SutTypes = {
  sut: ValidateUserService;
  getAccountByUserIdRepositoryPortStub: {
    getAccount: jest.Mock<getAccountByUserIdRepositoryPort>;
  };
  compareIfPasswordIsValidStub: {
    compare: jest.Mock<Promise<boolean>>;
  };
};
