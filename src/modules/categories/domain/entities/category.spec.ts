import UniqueEntityId from '@/shared/@seedworks/domain/value-objects/unique-entity-id';
import { Category, CategoryProps } from './Category';

const makeSut = (): Category => {
  const categoryProps: CategoryProps = {
    accountId: 'any_account_id',
    name: 'any_category_name',
    emoji: 'any_emoji',
  };
  const id = new UniqueEntityId('507f1f77bcf86cd799439011');
  return new Category(categoryProps, id);
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

  it('should create a category with a emoji', () => {
    const sut = makeSut();
    expect(sut.props).toHaveProperty('accountId');
    expect(sut.props.emoji).toBe('any_emoji');
  });

  it('should create a category with a valid createdAt Date', () => {
    const sut = makeSut();
    expect(sut.props).toHaveProperty('accountId');
    expect(sut.props).toHaveProperty('createdAt');
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('should create a category with a own id as UniqueEntityId', () => {
    const sut = makeSut();
    expect(sut).toHaveProperty('id');
    expect(sut.id).toBeDefined();
    expect(sut.id).toBeTruthy();
    expect(sut.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
  });
});
