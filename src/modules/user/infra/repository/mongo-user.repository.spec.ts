import { MongoUserRepository } from './mongo-user.repository';

describe('MongoUserRepository', () => {
  it('should be defined', () => {
    const repository = new MongoUserRepository();
    expect(repository).toBeDefined();
  });
});
