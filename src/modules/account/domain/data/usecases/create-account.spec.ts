import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountUseCase } from './create-account';

const makeSut = async (): Promise<SutTypes> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [CreateAccountUseCase],
  }).compile();
  const sut = moduleRef.get<CreateAccountUseCase>(CreateAccountUseCase);
  return { sut };
};

type SutTypes = {
  sut: CreateAccountUseCase;
};

describe('CreateAccountUseCase', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreateAccountUseCase);
    expect(sut).toBeTruthy();
  });
});
