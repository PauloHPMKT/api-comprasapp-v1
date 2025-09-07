import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoryUseCase } from './create-category';
import { CreateCategoryModel } from '../../domain/models/create-category';

const makeMocks = () => ({
  cerifyCategoryExistsStub: {
    verify: jest.fn().mockResolvedValue(false),
  },
});

export const makeSut = async (): Promise<SutTypes> => {
  const { cerifyCategoryExistsStub } = makeMocks();

  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      CreateCategoryUseCase,
      {
        provide: 'VERIFY_CATEGORY_EXISTS_REPOSITORY_PORT',
        useValue: cerifyCategoryExistsStub,
      },
    ],
  }).compile();

  const sut = moduleRef.get<CreateCategoryUseCase>(CreateCategoryUseCase);
  return { sut, cerifyCategoryExistsStub };
};

type SutTypes = {
  sut: CreateCategoryUseCase;
  cerifyCategoryExistsStub: {
    verify: jest.Mock<Promise<boolean>>;
  };
};

describe('CreateCategory UseCase', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreateCategoryUseCase);
  });

  it('ahould throw an error if accountId is not provided', async () => {
    const { sut } = await makeSut();
    const params: CreateCategoryModel.Params = {
      accountId: undefined,
      name: 'any_name',
      emoji: 'any_emoji',
    };

    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow();
  });

  it('should throw if a category with the same name already exists', async () => {
    const { sut, cerifyCategoryExistsStub } = await makeSut();
    const params: CreateCategoryModel.Params = {
      accountId: 'any_account_id',
      name: 'any_name',
      emoji: '❓',
    };

    jest.spyOn(cerifyCategoryExistsStub, 'verify').mockResolvedValueOnce(true);

    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow(
      new Error('Uma categoria com o nome any_nam já existe!'),
    );
  });
});
