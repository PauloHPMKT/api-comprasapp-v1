import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../auth.controller';

export const makeAuthControllerSut = async (): Promise<SutTypes> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [AuthController],
    providers: [],
  }).compile();

  const sut = moduleRef.get<AuthController>(AuthController);
  return { sut };
};

type SutTypes = {
  sut: AuthController;
};
