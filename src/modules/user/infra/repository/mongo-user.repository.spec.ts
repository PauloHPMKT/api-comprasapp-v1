import { Test, TestingModule } from '@nestjs/testing';
import { MongoUserRepository } from './mongo-user.repository';
import { MongoHelper } from '@/modules/database/mongodb/helpers/mongo-helper';

const makeSut = async (): Promise<SutTypes> => {
  const findOneMock = jest.fn();

  jest.spyOn(MongoHelper, 'getCollection').mockReturnValue({
    findOne: findOneMock,
  } as any);

  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [MongoUserRepository],
  }).compile();

  const sut = moduleRef.get<MongoUserRepository>(MongoUserRepository);

  return { sut, findOneMock };
};

type SutTypes = {
  sut: MongoUserRepository;
  findOneMock: jest.Mock;
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
});
