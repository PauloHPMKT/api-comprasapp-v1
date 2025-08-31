import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoryController } from '../../create-category.controller';

export const makeCreateCategorySut = async (): Promise<SutTypes> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [CreateCategoryController],
    providers: [],
  }).compile();
  const sut = moduleRef.get<CreateCategoryController>(CreateCategoryController);
  return { sut };
};

type SutTypes = {
  sut: CreateCategoryController;
};
