import { Test, TestingModule } from '@nestjs/testing';
import { MongoUserRepository } from './mongo-user.repository';

const makeSut = async (): Promise<SutTypes> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [MongoUserRepository],
  }).compile();
  const sut = moduleRef.get<MongoUserRepository>(MongoUserRepository);
  return { sut };
};

type SutTypes = {
  sut: MongoUserRepository;
};

describe('MongoUserRepository', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(MongoUserRepository);
    expect(sut).toBeTruthy();
  });
});
