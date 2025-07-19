import { Test, TestingModule } from '@nestjs/testing';
import { SignupController } from './signup.controller';
import { SignupModel } from '../../domain/models/signup';
import { AddAccount } from '../../domain/usecases/add-account';
import { MissingParamError } from '@/shared/errors/missing-param-error';
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';
import { ServerError } from '@/shared/errors/server-error';

const makeAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    // TODO - Adicionar objeto de valor para garantir que a string é um email válido Promise<string | Error>
    async execute(params: SignupModel.Params): Promise<string> {
      console.log(params);
      return 'valid_email@mail.com';
    }
  }
  return new AddAccountStub();
};

const makeSut = async (): Promise<SutTypes> => {
  const addAccountStub = makeAddAccountStub();
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [SignupController],
    providers: [
      {
        provide: 'AddAccount',
        useValue: addAccountStub,
      },
    ],
  }).compile();
  const sut = moduleRef.get<SignupController>(SignupController);
  return { sut, addAccountStub };
};

type SutTypes = {
  sut: SignupController;
  addAccountStub: AddAccount;
};

describe('AppController', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(SignupController);
    expect(sut).toBeTruthy();
  });

  it('should return 400 if no name is provided', async () => {
    const { sut } = await makeSut();
    const request = {
      body: {
        name: undefined,
        email: 'anyemail@mail.com',
        password: 'anypassword',
        confirmationPassword: 'anypassword',
      },
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('name'));
  });

  it('should return 400 if no email is provided', async () => {
    const { sut } = await makeSut();
    const request = {
      body: {
        name: 'anyname',
        email: undefined,
        password: 'anypassword',
        confirmationPassword: 'anypassword',
      },
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('email'));
  });

  it('should return 400 if no password is provided', async () => {
    const { sut } = await makeSut();
    const request = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: undefined,
        confirmationPassword: 'anypassword',
      },
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('password'));
  });

  it('should return 400 if no confirmationPassword is provided', async () => {
    const { sut } = await makeSut();
    const request = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword',
        confirmationPassword: undefined,
      },
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      new MissingParamError('confirmationPassword'),
    );
  });

  it('should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = await makeSut();
    const addAccountSpy = jest.spyOn(addAccountStub, 'execute');
    const request = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword',
        confirmationPassword: 'anypassword',
      },
    };
    await sut.handle(request);
    expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      confirmationPassword: 'anypassword',
    });
  });

  it('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = await makeSut();
    jest.spyOn(addAccountStub, 'execute').mockImplementationOnce(() => {
      throw new Error('Internal server error');
    });
    const request = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword',
        confirmationPassword: 'anypassword',
      },
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });

  it('should return 422 if User already exists', async () => {
    const { sut, addAccountStub } = await makeSut();
    jest.spyOn(addAccountStub, 'execute').mockImplementationOnce(() => {
      throw new UserAlreadyExistsError();
    });
    const request = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword',
        confirmationPassword: 'anypassword',
      },
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual(new UserAlreadyExistsError());
  });
});
