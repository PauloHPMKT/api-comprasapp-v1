import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoryController } from './create-category.controller';
import { MissingParamError } from '@/shared/errors';

const makeSut = async (): Promise<SutTypes> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [CreateCategoryController],
    providers: [],
  }).compile();
  const sut = moduleRef.get<CreateCategoryController>(CreateCategoryController);
  return { sut };
};

type SutTypes = {
  sut: CreateCategoryController;
};

describe('CreateCategoryController', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreateCategoryController);
    expect(sut).toBeTruthy();
  });

  it('should return bad request if no name is provided', async () => {
    const { sut } = await makeSut();
    const request = {
      accountId: 'any_account_id',
      name: undefined,
      emoji: '🍹',
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('name').message);
  });

  it('should return bad request if no emoji is provided', async () => {
    const { sut } = await makeSut();
    const request = {
      accountId: 'any_account_id',
      name: 'any_category_name',
      emoji: undefined,
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('emoji').message);
  });
});
