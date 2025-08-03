import { Test, TestingModule } from '@nestjs/testing';
import { CreateDefaultCategoriesUseCase } from './create-default-categories';

const makeSut = async (): Promise<SutTypes> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [CreateDefaultCategoriesUseCase],
  }).compile();
  const sut = moduleRef.get<CreateDefaultCategoriesUseCase>(
    CreateDefaultCategoriesUseCase,
  );
  return {
    sut,
  };
};

type SutTypes = {
  sut: CreateDefaultCategoriesUseCase;
};

describe('CreateDefaultCategoriesUseCase', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreateDefaultCategoriesUseCase);
    expect(sut).toBeTruthy();
  });
});
