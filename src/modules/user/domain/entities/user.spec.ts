import { User, UserProps } from './User';

const makeSut = (): User => {
  const props: UserProps = {
    name: 'Test User',
    email: 'any_email@mail.com',
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

  it('should have a valid email', () => {
    const sut = makeSut();
    expect(sut.props.email).toBe('any_email@mail.com');
    expect(typeof sut.props.email).toBe('string');
  });

  it('should create a user with avatar as null', () => {
    const sut = makeSut();
    expect(sut.props.avatar).toBeNull();
  });

  it('should create a user with all properties defined', () => {
    const sut = makeSut();
    expect(sut.props).toBeDefined();
    expect(sut.props.name).toBeDefined();
    expect(sut.props.email).toBeDefined();
    expect(sut.props.avatar).toBeDefined();
    expect(sut.props.createdAt).toBeDefined();
  });
});
