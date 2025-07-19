import { Test, TestingModule } from '@nestjs/testing';
import { SignupController } from './signup.controller';

const makeSut = async (): Promise<SutTypes> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [SignupController],
  }).compile();
  const sut = moduleRef.get<SignupController>(SignupController);
  return { sut };
};

type SutTypes = {
  sut: SignupController;
};

describe('AppController', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(SignupController);
    expect(sut).toBeTruthy();
  });
});
