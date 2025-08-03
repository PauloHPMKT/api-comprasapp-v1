import { Test, TestingModule } from '@nestjs/testing';
import { CreateDefaultCategoriesUseCase } from './create-default-categories';

const makeMocks = () => ({
  createDefaultCategoriesRepositoryStub: {
    create: jest.fn().mockResolvedValue(undefined),
  },
});

const makeSut = async (): Promise<SutTypes> => {
  const { createDefaultCategoriesRepositoryStub } = makeMocks();

  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      CreateDefaultCategoriesUseCase,
      {
        provide: 'CreateDefaultCategoriesRepositoryPort',
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
    create: jest.Mock;
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
      await expect(promise).rejects.toThrow('Account ID is required');
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
      'create',
    );
    const expectedCategories = categories.map((category) => ({
      ...category,
      accountId,
      createdAt: expect.any(Date),
    }));
    sut.execute(accountId);
    expect(createDefaultCategoriesSpy).toHaveBeenCalledWith(expectedCategories);
  });
});
