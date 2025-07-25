import UniqueEntityId from '@/shared/@seedworks/domain/value-objects/unique-entity-id';
import { User, UserProps } from './User';

const makeSut = (): User => {
  const props: UserProps = {
    name: 'Test User',
    email: 'any_email@mail.com',
  };
  const id = new UniqueEntityId('507f1f77bcf86cd799439011');
  return new User(props, id);
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

  it('should create a user with a valid UniqueEntityId', () => {
    const sut = makeSut();
    expect(sut.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(sut.id).toBe('507f1f77bcf86cd799439011');
    expect(sut.id).not.toBeNull();
  });
});
