import { Test, TestingModule } from '@nestjs/testing';
import { ValidateUserService } from '../../validate-user.service';
import { makeValidateUserServiceMock } from './validate-user.mocks';
import { getAccountByUserIdRepositoryPort } from '../../../../data/repositories/get-account-by-user-is.repository';

export const makeValidateUserSut = async (): Promise<SutTypes> => {
  const { getAccountByUserIdRepositoryPortStub } =
    makeValidateUserServiceMock();
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [],
    providers: [
      ValidateUserService,
      {
        provide: 'GET_ACCOUNT_BY_USER_ID_REPOSITORY_PORT',
        useValue: getAccountByUserIdRepositoryPortStub,
      },
    ],
  }).compile();

  const sut = moduleRef.get<ValidateUserService>(ValidateUserService);
  return { sut, getAccountByUserIdRepositoryPortStub };
};

type SutTypes = {
  sut: ValidateUserService;
  getAccountByUserIdRepositoryPortStub: {
    getAccount: jest.Mock<getAccountByUserIdRepositoryPort>;
  };
};
