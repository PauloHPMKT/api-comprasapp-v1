import { Test, TestingModule } from '@nestjs/testing';
import { SigninUsecase } from '../../signin';
import { mocksSigninParams } from './signin.mocks';
import { ValidateUserCredentials } from '../../../protocols/validate-user-credentials';

export const makeSigninUsecaseSut = async (): Promise<SutTypes> => {
  const { validateUserCredentialsStub } = mocksSigninParams();
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [],
    providers: [
      SigninUsecase,
      {
        provide: 'VALIDATE_USER_CREDENTIALS',
        useValue: validateUserCredentialsStub,
      },
    ],
  }).compile();

  const sut = moduleRef.get<SigninUsecase>(SigninUsecase);
  return { sut, validateUserCredentialsStub };
};

type SutTypes = {
  sut: SigninUsecase;
  validateUserCredentialsStub: { validate: jest.Mock<ValidateUserCredentials> };
};
