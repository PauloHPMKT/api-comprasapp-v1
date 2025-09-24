import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../auth.controller';
import { makeAuthControllerMocks } from './auth.controller.mocks';
import { SigninPort } from '@/modules/auth/domain/usecases/signin';

export const makeAuthControllerSut = async (): Promise<SutTypes> => {
  const { signinStub } = makeAuthControllerMocks();
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [AuthController],
    providers: [
      {
        provide: 'SIGNIN_PORT',
        useValue: signinStub,
      },
    ],
  }).compile();

  const sut = moduleRef.get<AuthController>(AuthController);
  return { sut, signinStub };
};

type SutTypes = {
  sut: AuthController;
  signinStub: { execute: jest.Mock<SigninPort> };
};
