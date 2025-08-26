import { Test, TestingModule } from '@nestjs/testing';
import { CreateDefaultCategoriesUseCase } from './create-default-categories';

const makeMocks = () => ({
  createDefaultCategoriesRepositoryStub: {
    addCategories: jest.fn().mockResolvedValue(undefined),
  },
});

const makeSut = async (): Promise<SutTypes> => {
  const { createDefaultCategoriesRepositoryStub } = makeMocks();

  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      CreateDefaultCategoriesUseCase,
      {
        provide: 'CREATE_DEFAULT_CATEGORIES_REPOSITORY_PORT',
        useValue: createDefaultCategoriesRepositoryStub,
      },
    ],
  }).compile();
  const sut = moduleRef.get<CreateDefaultCategoriesUseCase>(
    CreateDefaultCategoriesUseCase,
  );
  return {
    sut,
    createDefaultCategoriesRepositoryStub,
  };
};

type SutTypes = {
  sut: CreateDefaultCategoriesUseCase;
  createDefaultCategoriesRepositoryStub: {
    addCategories: jest.Mock;
  };
};

describe('CreateDefaultCategoriesUseCase', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreateDefaultCategoriesUseCase);
    expect(sut).toBeTruthy();
  });

  it.each([undefined, null, ''])(
    'should throw an error if accountId has any invalid value: %s',
    async (invalidAccountId) => {
      const { sut } = await makeSut();
      const promise = sut.execute(invalidAccountId as any);
      await expect(promise).rejects.toThrow('Account ID é obrigatório');
    },
  );

  it('should call CreateDefaultCategoriesRepository with correct ', async () => {
    const { sut, createDefaultCategoriesRepositoryStub } = await makeSut();
    const accountId = 'valid_account_id';
    const categories = [
      { name: 'Hortifrutti', emoji: '🥦' },
      { name: 'Mercearia', emoji: '🛒' },
      { name: 'Limpeza', emoji: '🧽' },
      { name: 'Higiene', emoji: '🧼' },
      { name: 'Bebidas', emoji: '🍹' },
      { name: 'Padaria', emoji: '🍞' },
      { name: 'Carnes', emoji: '🥩' },
      { name: 'Outros', emoji: '❓' },
    ];
    const createDefaultCategoriesSpy = jest.spyOn(
      createDefaultCategoriesRepositoryStub,
      'addCategories',
    );
    const expectedCategories = categories.map((category) => ({
      id: expect.any(String),
      accountId,
      ...category,
      createdAt: expect.any(Date),
    }));
    sut.execute(accountId);
    expect(createDefaultCategoriesSpy).toHaveBeenCalledWith(expectedCategories);
  });
});
