import { Test, TestingModule } from '@nestjs/testing';
import { MongoHelper } from '@/modules/database/mongodb/helpers/mongo-helper';
import { MongoAccountRepository } from './mongo-account.repository';

const makeSut = async (): Promise<SutTypes> => {
  const findOneMock = jest.fn();
  const insertOneMock = jest.fn();

  jest.spyOn(MongoHelper, 'getCollection').mockReturnValue({
    findOne: findOneMock,
    insertOne: insertOneMock,
  } as any);

  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [MongoAccountRepository],
  }).compile();

  const sut = moduleRef.get<MongoAccountRepository>(MongoAccountRepository);

  return { sut, findOneMock, insertOneMock };
};

type SutTypes = {
  sut: MongoAccountRepository;
  findOneMock: jest.Mock;
  insertOneMock: jest.Mock;
};

describe('MongoAccountRepository', () => {
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
    expect(sut).toBeInstanceOf(MongoAccountRepository);
    expect(sut).toBeTruthy();
  });

  it('should return null if no account is found', async () => {
    const { sut, findOneMock } = await makeSut();
    findOneMock.mockResolvedValue(null);

    const result = await sut.checkAccountByStatus('nonexistentUserId');
    expect(result).toBeNull();
    expect(findOneMock).toHaveBeenCalledWith(
      { userId: 'nonexistentUserId' },
      { projection: { _id: 1, isActive: 1 } },
    );
  });

  it('should return true if account is active', async () => {
    const { sut, findOneMock } = await makeSut();
    findOneMock.mockResolvedValue({ _id: 'someId', isActive: true });

    const result = await sut.checkAccountByStatus('activeUserId');
    expect(result).toBe(true);
    expect(findOneMock).toHaveBeenCalledWith(
      { userId: 'activeUserId' },
      { projection: { _id: 1, isActive: 1 } },
    );
  });

  it('should return false if account is not active', async () => {
    const { sut, findOneMock } = await makeSut();
    findOneMock.mockResolvedValue({ _id: 'someId', isActive: false });

    const result = await sut.checkAccountByStatus('inactiveUserId');
    expect(result).toBe(false);
    expect(findOneMock).toHaveBeenCalledWith(
      { userId: 'inactiveUserId' },
      { projection: { _id: 1, isActive: 1 } },
    );
  });
});
