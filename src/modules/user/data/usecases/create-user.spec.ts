import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user';
import { User } from '../../domain/entities/User';

jest.mock('../../domain/entities/user', () => {
  return {
    User: jest.fn().mockImplementation((props) => ({
      ...props,
      mocked: true,
    })),
  };
});

const makeMocks = () => ({
  isExistsUserRepositoryStub: {
    exists: jest.fn().mockResolvedValue(false),
  },
});

const makeSut = async (): Promise<SutTypes> => {
  const { isExistsUserRepositoryStub } = makeMocks();
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      CreateUserUseCase,
      {
        provide: 'IsExistsUserRepositoryPort',
        useValue: isExistsUserRepositoryStub,
      },
    ],
  }).compile();
  const sut = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  return {
    sut,
    isExistsUserRepositoryStub,
  };
};

type SutTypes = {
  sut: CreateUserUseCase;
  isExistsUserRepositoryStub: { exists: jest.Mock };
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
});
