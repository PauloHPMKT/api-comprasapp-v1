import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user';

// const makeMocks = () => ({});

const makeSut = async (): Promise<SutTypes> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [CreateUserUseCase],
  }).compile();
  const sut = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  return {
    sut,
  };
};

type SutTypes = {
  sut: CreateUserUseCase;
};

describe('CreateUserUseCase', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreateUserUseCase);
    expect(sut).toBeTruthy();
  });
});
