import { Test, TestingModule } from '@nestjs/testing';
import { MongoHelper } from '@/modules/database/mongodb/helpers/mongo-helper';
import { MongoCategoriesRepository } from './mongo-category.repository';
import { ObjectId } from 'mongodb';

const makeSut = async (): Promise<SutTypes> => {
  const findOneMock = jest.fn();
  const insertManyMock = jest.fn();

  jest.spyOn(MongoHelper, 'getCollection').mockReturnValue({
    findOne: findOneMock,
    insertMany: insertManyMock,
  } as any);

  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [MongoCategoriesRepository],
  }).compile();

  const sut = moduleRef.get<MongoCategoriesRepository>(
    MongoCategoriesRepository,
  );

  return { sut, findOneMock, insertManyMock };
};

type SutTypes = {
  sut: MongoCategoriesRepository;
  findOneMock: jest.Mock;
  insertManyMock: jest.Mock;
};

describe('MongoUserRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('users');
    await accountCollection.deleteMany({});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(MongoCategoriesRepository);
    expect(sut).toBeTruthy();
  });

  it('should insert many default categories', async () => {
    const { sut, insertManyMock } = await makeSut();
    const categoryId = new ObjectId();
    const categories = [
      {
        id: categoryId.toString(),
        accountId: 'any_account_id',
        name: 'Hortifrutti',
        emoji: '🥦',
        createdAt: new Date('2024-01-01T00:00:00Z'),
      },
      {
        id: categoryId.toString(),
        accountId: 'any_account_id',
        name: 'Mercearia',
        emoji: '🛒',
        createdAt: new Date('2024-01-01T00:00:00Z'),
      },
    ];
    await sut.addCategories(categories);
    expect(insertManyMock).toHaveBeenCalledTimes(1);
    expect(insertManyMock).toHaveBeenCalledWith([
      {
        _id: expect.any(ObjectId),
        accountId: 'any_account_id',
        name: 'Hortifrutti',
        emoji: '🥦',
        createdAt: new Date('2024-01-01T00:00:00Z'),
      },
      {
        _id: expect.any(ObjectId),
        accountId: 'any_account_id',
        name: 'Mercearia',
        emoji: '🛒',
        createdAt: new Date('2024-01-01T00:00:00Z'),
      },
    ]);
  });
});
