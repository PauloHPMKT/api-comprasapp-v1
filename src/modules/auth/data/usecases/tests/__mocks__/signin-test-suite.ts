import { Test, TestingModule } from '@nestjs/testing';
import { SigninUsecase } from '../../signin';
import { mocksSigninParams } from './signin.mocks';
import { FindUserIdByEmailRepository } from '../../../repositories/find-user-id-by-email.repository';
import { TokenPayloadModel } from '../../../../domain/models/token-payload';

export const makeSigninUsecaseSut = async (): Promise<SutTypes> => {
  const { validateUserCredentialsStub, findUserIdByEmailStub } =
    mocksSigninParams();
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [],
    providers: [
      SigninUsecase,
      {
        provide: 'FIND_USER_ID_BY_EMAIL_REPOSITORY',
        useValue: findUserIdByEmailStub,
      },
      {
        provide: 'VALIDATE_USER_CREDENTIALS',
        useValue: validateUserCredentialsStub,
      },
    ],
  }).compile();

  const sut = moduleRef.get<SigninUsecase>(SigninUsecase);
  return {
    sut,
    findUserIdByEmailStub,
    validateUserCredentialsStub,
  };
};

type SutTypes = {
  sut: SigninUsecase;
  validateUserCredentialsStub: {
    validate: jest.Mock<
      Promise<TokenPayloadModel.Params>,
      [{ email: string; password: string }]
    >;
  };
  findUserIdByEmailStub: {
    findByEmail: jest.Mock<FindUserIdByEmailRepository>;
  };
};
