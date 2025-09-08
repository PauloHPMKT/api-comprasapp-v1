import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoryUseCase } from './create-category';
import { CreateCategoryModel } from '../../domain/models/create-category';
import { Category } from '../../domain/entities/Category';
import { CategoryAlreadyExistsError } from '@/shared/errors';

jest.mock('../../domain/entities/category', () => ({
  Category: jest.fn().mockImplementation(() => {
    return {
      toJSON: jest.fn().mockReturnValue({
        id: 'any_id',
        accountId: 'any_account_id',
        name: 'any_name',
        emoji: '❓',
        createdAt: new Date('2025-01-01T00:00:00Z'),
      }),
    };
  }),
}));

const makeMocks = () => ({
  verifyCategoryExistsStub: {
    verify: jest.fn().mockResolvedValue(false),
  },
  createCategoryStub: {
    create: jest.fn().mockResolvedValue({ id: 'any_id', name: 'any_name' }),
  },
});

export const makeSut = async (): Promise<SutTypes> => {
  const { verifyCategoryExistsStub, createCategoryStub } = makeMocks();

  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      CreateCategoryUseCase,
      {
        provide: 'VERIFY_CATEGORY_EXISTS_REPOSITORY_PORT',
        useValue: verifyCategoryExistsStub,
      },
      {
        provide: 'CREATE_CATEGORY_REPOSITORY_PORT',
        useValue: createCategoryStub,
      },
    ],
  }).compile();

  const sut = moduleRef.get<CreateCategoryUseCase>(CreateCategoryUseCase);
  return { sut, verifyCategoryExistsStub, createCategoryStub };
};

type SutTypes = {
  sut: CreateCategoryUseCase;
  verifyCategoryExistsStub: {
    verify: jest.Mock<Promise<boolean>>;
  };
  createCategoryStub: {
    create: jest.Mock<Promise<{ id: string; name: string }>>;
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

  it('should call verifyCategoryExists with correct category params', async () => {
    const { sut, verifyCategoryExistsStub } = await makeSut();
    const params: CreateCategoryModel.Params = {
      accountId: 'any_account_id',
      name: 'any_name',
      emoji: '❓',
    };

    const verifySpy = jest.spyOn(verifyCategoryExistsStub, 'verify');
    await sut.execute(params);

    expect(verifySpy).toHaveBeenCalledWith('any_account_id', 'any_name');
  });

  it('should throw if a category with the same name already exists', async () => {
    const { sut, verifyCategoryExistsStub } = await makeSut();
    const params: CreateCategoryModel.Params = {
      accountId: 'any_account_id',
      name: 'any_name',
      emoji: '❓',
    };

    jest.spyOn(verifyCategoryExistsStub, 'verify').mockResolvedValueOnce(true);

    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow(
      new CategoryAlreadyExistsError('any_name'),
    );
  });

  it('should call Category Entity with correct params', async () => {
    const { sut } = await makeSut();
    const params: CreateCategoryModel.Params = {
      accountId: '507f1f77bcf86cd799439012',
      name: 'any_name',
      emoji: '❓',
    };

    await sut.execute(params);
    expect(Category).toHaveBeenCalledWith({
      accountId: '507f1f77bcf86cd799439012',
      name: 'any_name',
      emoji: '❓',
    });
  });

  it('should call createCategoryRepository with correct values', async () => {
    const { sut, createCategoryStub } = await makeSut();
    const params: CreateCategoryModel.Params = {
      accountId: 'any_account_id',
      name: 'any_name',
      emoji: '❓',
    };

    const createCategorySpy = jest.spyOn(createCategoryStub, 'create');
    await sut.execute(params);

    expect(createCategorySpy).toHaveBeenCalledWith({
      id: 'any_id',
      accountId: params.accountId,
      name: params.name,
      emoji: params.emoji,
      createdAt: expect.any(Date),
    });
  });

  it('should return the created category on success', async () => {
    const { sut } = await makeSut();
    const params: CreateCategoryModel.Params = {
      accountId: 'any_account_id',
      name: 'any_name',
      emoji: '❓',
    };

    const category = await sut.execute(params);
    expect(category).toEqual({
      id: 'any_id',
      name: 'any_name',
    });
  });
});
