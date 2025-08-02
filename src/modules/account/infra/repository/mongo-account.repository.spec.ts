import { MongoAccountRepository } from './mongo-account.repository';

const makeSut = (): MongoAccountRepository => {
  const sut = new MongoAccountRepository();
  return sut;
};

describe('MongoAccountRepository', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(MongoAccountRepository);
    expect(sut).toBeTruthy();
  });
});
