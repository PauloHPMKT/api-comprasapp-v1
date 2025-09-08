import { Test, TestingModule } from '@nestjs/testing';
import { MongoHelper } from '@/modules/database/mongodb/helpers/mongo-helper';
import { MongoCategoriesRepository } from './mongo-category.repository';
import { ObjectId } from 'mongodb';

const makeSut = async (): Promise<SutTypes> => {
  const findOneMock = jest.fn();
  const insertManyMock = jest.fn();
  const insertOneMock = jest.fn();

  jest.spyOn(MongoHelper, 'getCollection').mockReturnValue({
    findOne: findOneMock,
    insertMany: insertManyMock,
    insertOne: insertOneMock,
  } as any);

  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [MongoCategoriesRepository],
  }).compile();

  const sut = moduleRef.get<MongoCategoriesRepository>(
    MongoCategoriesRepository,
  );

  return { sut, findOneMock, insertManyMock, insertOneMock };
};

type SutTypes = {
  sut: MongoCategoriesRepository;
  findOneMock: jest.Mock;
  insertManyMock: jest.Mock;
  insertOneMock: jest.Mock;
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

  it('should return true if category exists', async () => {
    const { sut, findOneMock } = await makeSut();
    findOneMock.mockResolvedValueOnce({ _id: new ObjectId() });

    const category = await sut.verify('any_account_id', 'any_name');

    expect(findOneMock).toHaveBeenCalledTimes(1);
    expect(findOneMock).toHaveBeenCalledWith(
      { accountId: 'any_account_id', name: 'any_name' },
      { projection: { _id: 1 } },
    );
    expect(category).toBe(true);
  });

  it('should return false if category does not exist', async () => {
    const { sut, findOneMock } = await makeSut();
    findOneMock.mockResolvedValueOnce(null);

    const result = await sut.verify('any_account_id', 'Inexistente');

    expect(findOneMock).toHaveBeenCalledTimes(1);
    expect(findOneMock).toHaveBeenCalledWith(
      { accountId: 'any_account_id', name: 'Inexistente' },
      { projection: { _id: 1 } },
    );
    expect(result).toBe(false);
  });

  it('should add a new account', async () => {
    const { sut, insertOneMock } = await makeSut();
    const insertedId = new ObjectId('507f1f77bcf86cd799439012');
    const params = {
      id: insertedId.toString(),
      accountId: 'any_account_id',
      name: 'any_name',
      emoji: '🛒',
      createdAt: new Date(),
    };
    insertOneMock.mockResolvedValue({ insertedId: insertedId });
    await sut.create(params);
    expect(insertOneMock).toHaveBeenCalledWith({
      _id: MongoHelper.toObjectId(params.id),
      accountId: params.accountId,
      name: params.name,
      emoji: params.emoji,
      createdAt: params.createdAt,
    });
    expect(insertedId.toHexString()).toBe('507f1f77bcf86cd799439012');
    expect(insertedId.toHexString()).toEqual(params.id);
    expect(insertedId.toHexString()).toBeDefined();
    expect(insertedId.toHexString()).toBeTruthy();
    expect(insertedId.toHexString()).not.toBeNull();
    expect(insertOneMock).toHaveBeenCalledTimes(1);
  });
});
