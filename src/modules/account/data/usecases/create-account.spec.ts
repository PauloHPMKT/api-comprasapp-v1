import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountUseCase } from './create-account';
import { Account } from '../../domain/entities/Account';

jest.mock('../../domain/entities/account', () => ({
  Account: jest.fn().mockImplementation(() => {
    return {
      toJSON: jest.fn().mockReturnValue({
        id: 'valid_id',
        plan: 'free',
        isActive: true,
        userId: '507f1f77bcf86cd799439012',
        password: 'hashed_password',
        createdAt: new Date('2025-01-01T00:00:00Z'),
      }),
    };
  }),
}));

const makeMocks = () => ({
  isActiveAccountRepositoryPortStub: {
    checkAccountByStatus: jest.fn().mockReturnValue(true),
  },
  createAccountRepositoryPortStub: {
    add: jest.fn().mockResolvedValue({
      id: 'valid_id',
      plan: 'free',
      isActive: true,
      userId: '507f1f77bcf86cd799439012',
      password: 'hashed_password',
      createdAt: new Date('2025-01-01T00:00:00Z'),
    }),
  },
});

const makeSut = async (): Promise<SutTypes> => {
  const { isActiveAccountRepositoryPortStub, createAccountRepositoryPortStub } =
    makeMocks();
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      CreateAccountUseCase,
      {
        provide: 'IsActiveAccountRepositoryPort',
        useValue: isActiveAccountRepositoryPortStub,
      },
      {
        provide: 'CreateAccountRepositoryPort',
        useValue: createAccountRepositoryPortStub,
      },
    ],
  }).compile();
  const sut = moduleRef.get<CreateAccountUseCase>(CreateAccountUseCase);
  return {
    sut,
    isActiveAccountRepositoryPortStub,
    createAccountRepositoryPortStub,
  };
};

type SutTypes = {
  sut: CreateAccountUseCase;
  isActiveAccountRepositoryPortStub: { checkAccountByStatus: jest.Mock };
  createAccountRepositoryPortStub: { add: jest.Mock };
};

describe('CreateAccountUseCase', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreateAccountUseCase);
    expect(sut).toBeTruthy();
  });

  it('should thorw an exception if account is not active', async () => {
    const { sut, isActiveAccountRepositoryPortStub } = await makeSut();
    jest
      .spyOn(isActiveAccountRepositoryPortStub, 'checkAccountByStatus')
      .mockReturnValueOnce(false);
    const params = {
      userId: 'valid_user_id',
      password: 'any_password',
    };
    await expect(sut.execute(params)).rejects.toThrow('Account is not active');
  });

  it('should call Account Entity with correct parameters', async () => {
    const { sut } = await makeSut();
    const params = {
      userId: '507f1f77bcf86cd799439012',
      password: 'secure_password',
    };
    await sut.execute(params);
    expect(Account).toHaveBeenCalledWith({
      userId: '507f1f77bcf86cd799439012',
      password: 'secure_password',
    });
  });

  it('should call createAccountRepository with correct parameters', async () => {
    const { sut, createAccountRepositoryPortStub } = await makeSut();
    const params = {
      userId: '507f1f77bcf86cd799439012',
      password: 'secure_password',
    };
    const createAccountSpy = jest.spyOn(createAccountRepositoryPortStub, 'add');
    await sut.execute(params);
    expect(createAccountSpy).toHaveBeenCalledWith({
      id: 'valid_id',
      plan: 'free',
      isActive: true,
      userId: '507f1f77bcf86cd799439012',
      password: 'hashed_password',
      createdAt: new Date('2025-01-01T00:00:00Z'),
    });
  });

  it('should return the created account id', async () => {
    const { sut } = await makeSut();
    const params = {
      userId: '507f1f77bcf86cd799439012',
      password: 'secure_password',
    };
    const result = await sut.execute(params);
    expect(result).toEqual({ id: 'valid_id' });
  });
});
