import { Test, TestingModule } from '@nestjs/testing';
import { MongoUserRepository } from './mongo-user.repository';
import { MongoHelper } from '@/modules/database/mongodb/helpers/mongo-helper';
import { ObjectId } from 'mongodb';

const makeSut = async (): Promise<SutTypes> => {
  const findOneMock = jest.fn();
  const insertOneMock = jest.fn();

  jest.spyOn(MongoHelper, 'getCollection').mockReturnValue({
    findOne: findOneMock,
    insertOne: insertOneMock,
  } as any);

  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [MongoUserRepository],
  }).compile();

  const sut = moduleRef.get<MongoUserRepository>(MongoUserRepository);

  return { sut, findOneMock, insertOneMock };
};

type SutTypes = {
  sut: MongoUserRepository;
  findOneMock: jest.Mock;
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
    expect(sut).toBeInstanceOf(MongoUserRepository);
    expect(sut).toBeTruthy();
  });

  it('deve retornar true quando o usuário existir', async () => {
    const { sut, findOneMock } = await makeSut();
    findOneMock.mockResolvedValueOnce({ _id: 'any_id' });
    const result = await sut.exists('any_email@mail.com');

    expect(result).toBe(true);
    expect(MongoHelper.getCollection).toHaveBeenCalledWith('users');
    expect(findOneMock).toHaveBeenCalledWith(
      { email: 'any_email@mail.com' },
      { projection: { _id: 1 } },
    );
  });

  it('Should return an user on success', async () => {
    const { sut, insertOneMock, findOneMock } = await makeSut();

    const insertedId = new ObjectId();

    insertOneMock.mockResolvedValueOnce({ insertedId });

    findOneMock.mockResolvedValueOnce({
      _id: insertedId,
      email: 'any_email@mail.com',
    });

    const account = await sut.create({
      id: insertedId.toString(),
      name: 'any_name',
      email: 'any_email@mail.com',
      avatar: null,
      createdAt: new Date(),
    });

    expect(account).toBeTruthy();
    expect(account.id.toString()).toBe(insertedId.toString());
    expect(account.email).toBe('any_email@mail.com');
  });
});
