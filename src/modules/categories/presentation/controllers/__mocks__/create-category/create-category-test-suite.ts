import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoryController } from '../../create-category.controller';
import { makeCreateCategoryMocks } from './create-category.mocks';
import { CreateCategory } from '@/modules/categories/domain/ports/create-category';

export const makeCreateCategorySut = async (): Promise<SutTypes> => {
  const { createCategoryStub } = makeCreateCategoryMocks();
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [CreateCategoryController],
    providers: [
      {
        provide: 'CREATE_CATEGORY_PORT',
        useValue: createCategoryStub,
      },
    ],
  }).compile();
  const sut = moduleRef.get<CreateCategoryController>(CreateCategoryController);
  return { sut, createCategoryStub };
};

type SutTypes = {
  sut: CreateCategoryController;
  createCategoryStub: {
    execute: jest.Mock<CreateCategory>;
  };
};
