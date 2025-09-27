import { Test, TestingModule } from '@nestjs/testing';
import { SigninUsecase } from '../../signin';
import { mocksSigninParams } from './signin.mocks';
import { FindUserIdByEmailRepositoryPort } from '../../../repositories/find-user-id-by-email.repository';
import { TokenPayloadModel } from '../../../../domain/models/token-payload';
import { GenerateToken } from '../../../repositories/token-generator';

export const makeSigninUsecaseSut = async (): Promise<SutTypes> => {
  const {
    validateUserCredentialsStub,
    findUserIdByEmailStub,
    generateTokenStub,
  } = mocksSigninParams();
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [],
    providers: [
      SigninUsecase,
      {
        provide: 'FIND_USER_ID_BY_EMAIL_REPOSITORY_PORT',
        useValue: findUserIdByEmailStub,
      },
      {
        provide: 'VALIDATE_USER_CREDENTIALS',
        useValue: validateUserCredentialsStub,
      },
      {
        provide: 'GENERATE_TOKEN_PORT',
        useValue: generateTokenStub,
      },
    ],
  }).compile();

  const sut = moduleRef.get<SigninUsecase>(SigninUsecase);
  return {
    sut,
    findUserIdByEmailStub,
    validateUserCredentialsStub,
    generateTokenStub,
  };
};

type SutTypes = {
  sut: SigninUsecase;
  validateUserCredentialsStub: {
    validate: jest.Mock<
      Promise<TokenPayloadModel.Params>,
      [{ id: string; password: string }]
    >;
  };
  findUserIdByEmailStub: {
    findByEmail: jest.Mock<FindUserIdByEmailRepositoryPort>;
  };
  generateTokenStub: {
    generate: jest.Mock<Promise<GenerateToken>, [TokenPayloadModel.Params]>;
  };
};
