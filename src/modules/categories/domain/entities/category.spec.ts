import { Category } from './Category';

const makeSut = (): Category => {
  const categoryProps = {
    accountId: 'any_account_id',
  };
  return new Category(categoryProps);
};

describe('Category Entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(Category);
    expect(sut).toBeTruthy();
  });

  it('should create a category with account_id values', () => {
    const sut = makeSut();
    expect(sut.props.accountId).toBe('any_account_id');
  });
});
