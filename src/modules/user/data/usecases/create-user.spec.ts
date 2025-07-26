import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user';
import { User } from '../../domain/entities/User';

jest.mock('../../domain/entities/user', () => ({
  User: jest.fn().mockImplementation(() => {
    return {
      toJSON: jest.fn().mockReturnValue({
        id: 'valid_id',
        name: 'Test User',
        email: 'valid_email@mail.com',
        avatar: null,
        createdAt: new Date('2025-01-01T00:00:00Z'),
      }),
    };
  }),
}));

const makeMocks = () => ({
  isExistsUserRepositoryStub: {
    exists: jest.fn().mockResolvedValue(false),
  },
  createUserRepositoryStub: {
    create: jest.fn().mockResolvedValue({
      id: 'valid_id',
      email: 'valid_email@mail.com',
    }),
  },
});

const makeSut = async (): Promise<SutTypes> => {
  const { isExistsUserRepositoryStub, createUserRepositoryStub } = makeMocks();
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      CreateUserUseCase,
      {
        provide: 'IsExistsUserRepositoryPort',
        useValue: isExistsUserRepositoryStub,
      },
      {
        provide: 'CreateUserRepositoryPort',
        useValue: createUserRepositoryStub,
      },
    ],
  }).compile();
  const sut = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  return {
    sut,
    isExistsUserRepositoryStub,
    createUserRepositoryStub,
  };
};

type SutTypes = {
  sut: CreateUserUseCase;
  isExistsUserRepositoryStub: { exists: jest.Mock };
  createUserRepositoryStub: { create: jest.Mock };
};

describe('CreateUserUseCase', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreateUserUseCase);
    expect(sut).toBeTruthy();
  });

  it('should throw an error if user already exists', async () => {
    const { sut, isExistsUserRepositoryStub } = await makeSut();
    const params = {
      name: 'Test User',
      email: 'any_email@mail.com',
    };
    jest
      .spyOn(isExistsUserRepositoryStub, 'exists')
      .mockResolvedValueOnce(true);
    await expect(sut.execute(params)).rejects.toThrow('User already exists');
  });

  it('should call User Entity with correct parameters', async () => {
    const { sut } = await makeSut();
    const params = {
      name: 'Test User',
      email: 'any_email@mail.com',
    };
    await sut.execute(params);
    expect(User).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'any_email@mail.com',
    });
  });

  it('should call createUserRepository with correct parameters', async () => {
    const { sut, createUserRepositoryStub } = await makeSut();
    const params = {
      name: 'Test User',
      email: 'any_email@mail.com',
    };
    const createUserSpy = jest.spyOn(createUserRepositoryStub, 'create');
    await sut.execute(params);
    expect(createUserSpy).toHaveBeenCalledWith({
      id: 'valid_id',
      name: 'Test User',
      email: 'valid_email@mail.com',
      avatar: null,
      createdAt: expect.any(Date),
    });
  });
});
