import { Account } from './Account';

const makeSut = (): Account => {
  const props = {
    password: 'valid_password',
  };
  return new Account(props);
};

describe('Account Entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(Account);
  });

  it('should create a new Account with free plan as default', () => {
    const sut = makeSut();
    expect(sut.props.plan).toEqual('free');
  });

  it('should create a new Account with active status as default', () => {
    const sut = makeSut();
    expect(sut.props.isActive).toBe(true);
    expect(sut.props.isActive).not.toBe(false);
  });

  it('should create a new Account with userId null', () => {
    const sut = makeSut();
    expect(sut.props.userId).toBeNull();
  });

  it('should create a new Account with a valid Date', () => {
    const sut = makeSut();
    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('should create a new Account with a valid password', () => {
    const sut = makeSut();
    expect(sut.props.password).toBeDefined();
    expect(sut.props.password).not.toBeNull();
  });
});
