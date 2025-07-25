import { User } from './User';

const makeSut = (): User => {
  const props = {
    name: 'Test User',
  };
  return new User(props);
};

describe('User Entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(User);
    expect(sut).toBeTruthy();
  });

  it('should able to create a user by name', () => {
    const sut = makeSut();
    expect(sut.props.name).toBe('Test User');
    expect(typeof sut.props.name).toBe('string');
  });
});
