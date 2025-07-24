import { Test, TestingModule } from '@nestjs/testing';
import { AddSignupUseCase } from './add-signup';

const makeMocks = () => ({
  createUserStub: {
    execute: jest.fn().mockResolvedValue({
      email: 'valid_email@mail.com',
      id: 'valid_id',
    }),
  },
});

const makeSut = async (): Promise<SutTypes> => {
  const { createUserStub } = makeMocks();

  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      AddSignupUseCase,
      {
        provide: 'EncrypterPort',
        useValue: {
          hash: jest.fn().mockResolvedValue('hashed_password'),
        },
      },
      {
        provide: 'CreateUserPort',
        useValue: createUserStub,
      },
    ],
  }).compile();
  const sut = moduleRef.get<AddSignupUseCase>(AddSignupUseCase);
  return { sut, createUserStub };
};

type SutTypes = {
  sut: AddSignupUseCase;
  createUserStub: { execute: jest.Mock };
};

describe('AddSignupUseCase', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(AddSignupUseCase);
    expect(sut).toBeTruthy();
  });

  it('should thorw an error if password not match confirmationPassword', async () => {
    const { sut } = await makeSut();
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      confirmationPassword: 'anypassword2',
    };
    await expect(sut.execute(params)).rejects.toThrow(
      'Password and confirmation password do not match',
    );
  });

  it('should call CreateUser with correct params', async () => {
    const { sut, createUserStub } = await makeSut();
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      confirmationPassword: 'anypassword',
    };
    const createUserSpy = jest.spyOn(createUserStub, 'execute');
    await sut.execute(params);
    expect(createUserSpy).toHaveBeenCalledWith({
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      confirmationPassword: 'anypassword',
    });
  });

  it('should return an object with email and id from CreateUserPort', async () => {
    const { sut, createUserStub } = await makeSut();
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      confirmationPassword: 'anypassword',
    };
    await sut.execute(params);
    const result = await createUserStub.execute(params);
    expect(result).toHaveProperty('id', 'valid_id');
    expect(result).toHaveProperty('email', 'valid_email@mail.com');
  });
});
