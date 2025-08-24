import { Category } from './Category';

const makeSut = (): Category => {
  const categoryProps = {
    accountId: 'any_account_id',
    name: 'any_category_name',
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

  it('should create a category with a name', () => {
    const sut = makeSut();
    expect(sut.props).toHaveProperty('accountId');
    expect(sut.props.name).toBe('any_category_name');
  });
});
