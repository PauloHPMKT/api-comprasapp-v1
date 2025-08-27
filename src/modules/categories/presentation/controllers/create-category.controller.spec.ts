import { Test, TestingModule } from '@nestjs/testing';
import { CreateNewCategoryController } from './create-category.controller';

const makeSut = async (): Promise<SutTypes> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [CreateNewCategoryController],
    providers: [],
  }).compile();
  const sut = moduleRef.get<CreateNewCategoryController>(
    CreateNewCategoryController,
  );
  return { sut };
};

type SutTypes = {
  sut: CreateNewCategoryController;
};

describe('CreateCategoryController', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreateNewCategoryController);
    expect(sut).toBeTruthy();
  });
});
