import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoryUseCase } from './create-category';

export const makeSut = async (): Promise<SutTypes> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [CreateCategoryUseCase],
  }).compile();

  const sut = moduleRef.get<CreateCategoryUseCase>(CreateCategoryUseCase);
  return { sut };
};

type SutTypes = {
  sut: CreateCategoryUseCase;
};

describe('CreateCategory UseCase', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreateCategoryUseCase);
  });
});
