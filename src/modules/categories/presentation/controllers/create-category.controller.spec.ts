import { makeCreateCategorySut } from './__mocks__/create-category/create-category-test-suite';
import { CreateCategoryController } from './create-category.controller';
import { MissingParamError, ServerError } from '@/shared/errors';

describe('CreateCategoryController', () => {
  it('should be defined', async () => {
    const { sut } = await makeCreateCategorySut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreateCategoryController);
    expect(sut).toBeTruthy();
  });

  it('should return bad request if no name is provided', async () => {
    const { sut } = await makeCreateCategorySut();
    const request = {
      body: {
        name: undefined,
        emoji: '🍹',
      },
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('name').message);
  });

  it('should return bad request if no emoji is provided', async () => {
    const { sut } = await makeCreateCategorySut();
    const request = {
      body: {
        name: 'any_category_name',
        emoji: undefined,
      },
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('emoji').message);
  });

  it('should call createCategory with correct values', async () => {
    const { sut, createCategoryStub } = await makeCreateCategorySut();
    const request = {
      body: {
        name: 'any_category_name',
        emoji: '🍹',
      },
      decoded: { accountId: 'any_account_id' },
    };
    const createCategorySpy = jest.spyOn(createCategoryStub, 'execute');
    await sut.handle(request);
    expect(createCategorySpy).toHaveBeenCalledWith({
      accountId: 'any_account_id',
      name: 'any_category_name',
      emoji: '🍹',
    });
  });

  it('should return 500 if AddAccount throws', async () => {
    const { sut, createCategoryStub } = await makeCreateCategorySut();
    jest.spyOn(createCategoryStub, 'execute').mockImplementationOnce(() => {
      throw new Error('Internal server error');
    });
    const request = {
      body: {
        name: 'any_category_name',
        emoji: '🍹',
      },
    };
    const promise = await sut.handle(request);
    expect(promise.statusCode).toBe(500);
    expect(promise.body).toEqual(new ServerError().message);
  });

  it('should return 201 and category data on success', async () => {
    const { sut } = await makeCreateCategorySut();
    const request = {
      body: {
        name: 'any_category_name',
        emoji: '🍹',
      },
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: 'any_category_id',
      name: 'any_category_name',
    });
  });
});
