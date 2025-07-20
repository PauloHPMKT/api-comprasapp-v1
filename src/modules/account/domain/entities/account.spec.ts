import { Account } from './Account';

const makeSut = (): Account => {
  return new Account({});
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
});
