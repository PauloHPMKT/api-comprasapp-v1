import { Test, TestingModule } from '@nestjs/testing';
import { AddSignupUseCase } from './add-signup';

const makeMocks = () => ({
  createUserStub: {
    execute: jest.fn().mockResolvedValue({
      email: 'valid_email@mail.com',
      id: 'valid_id',
    }),
  },
  createAccountStub: {
    execute: jest.fn().mockResolvedValue({ id: 'valid_id' }),
  },
  encrypterStub: {
    hash: jest.fn().mockResolvedValue('hashed_password'),
  },
});

const makeSut = async (): Promise<SutTypes> => {
  const { createUserStub, encrypterStub, createAccountStub } = makeMocks();

  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      AddSignupUseCase,
      {
        provide: 'EncrypterPort',
        useValue: encrypterStub,
      },
      {
        provide: 'CreateUserPort',
        useValue: createUserStub,
      },
      {
        provide: 'CreateAccountPort',
        useValue: createAccountStub,
      },
    ],
  }).compile();
  const sut = moduleRef.get<AddSignupUseCase>(AddSignupUseCase);
  return { sut, createUserStub, encrypterStub, createAccountStub };
};

type SutTypes = {
  sut: AddSignupUseCase;
  createUserStub: { execute: jest.Mock };
  encrypterStub: { hash: jest.Mock };
  createAccountStub: { execute: jest.Mock };
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
    });
  });

  it('should throw an error if CreateUserPort throws an existant user', async () => {
    const { sut, createUserStub } = await makeSut();
    jest
      .spyOn(createUserStub, 'execute')
      .mockRejectedValue(new Error('User already exists'));
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      confirmationPassword: 'anypassword',
    };
    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow('User already exists');
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

  it('should call EncrypterPort with correct password', async () => {
    const { sut, encrypterStub } = await makeSut();
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      confirmationPassword: 'anypassword',
    };
    const encrypterSpy = jest.spyOn(encrypterStub, 'hash');
    await sut.execute(params);
    expect(encrypterSpy).toHaveBeenCalledWith('anypassword');
  });

  it('should call CreateAccountPort with correct params', async () => {
    const { sut, createAccountStub } = await makeSut();
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      confirmationPassword: 'anypassword',
    };
    const createAccountSpy = jest.spyOn(createAccountStub, 'execute');
    await sut.execute(params);
    expect(createAccountSpy).toHaveBeenCalledWith({
      password: 'hashed_password',
      userId: 'valid_id',
    });
  });

  it('should receive an account id from CreateAccountPort', async () => {
    const { sut, createAccountStub } = await makeSut();
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      confirmationPassword: 'anypassword',
    };
    jest
      .spyOn(createAccountStub, 'execute')
      .mockResolvedValueOnce({ id: 'any_account_id' });
    await sut.execute(params);

    const result = await createAccountStub.execute(params);
    expect(result).toHaveProperty('id', 'valid_id');
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

  it('should return the email on success', async () => {
    const { sut } = await makeSut();
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      confirmationPassword: 'anypassword',
    };
    const email = await sut.execute(params);
    expect(email).toBe('valid_email@mail.com');
  });
});
