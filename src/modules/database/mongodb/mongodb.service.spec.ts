import { Test, TestingModule } from '@nestjs/testing';
import { MongoDbService } from './mongodb.service';

const makeSut = async () => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [],
    providers: [MongoDbService],
  }).compile();

  const sut = moduleRef.get<MongoDbService>(MongoDbService);
  return { sut };
};

describe('MongoDbService', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(MongoDbService);
    expect(sut).toBeTruthy();
  });
});
