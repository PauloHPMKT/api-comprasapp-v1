import { Test, TestingModule } from '@nestjs/testing';
import { SignupController } from './signup.controller';
import { AddSignup } from '../../domain/usecases/add-account';
import { MissingParamError } from '@/shared/errors/missing-param-error';
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';
import { ServerError } from '@/shared/errors/server-error';

const makeMocks = () => ({
  addSignupStub: {
    execute: jest.fn().mockReturnValue(Promise.resolve('valid_email@mail.com')),
  },
});

const makeSut = async (): Promise<SutTypes> => {
  const { addSignupStub } = makeMocks();
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [SignupController],
    providers: [
      {
        provide: 'ADD_SIGNUP',
        useValue: addSignupStub,
      },
    ],
  }).compile();
  const sut = moduleRef.get<SignupController>(SignupController);
  return { sut, addSignupStub };
};

type SutTypes = {
  sut: SignupController;
  addSignupStub: AddSignup;
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
    expect(response.body).toEqual(new MissingParamError('name').message);
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
    expect(response.body).toEqual(new MissingParamError('email').message);
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
    expect(response.body).toEqual(new MissingParamError('password').message);
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
      new MissingParamError('confirmationPassword').message,
    );
  });

  it('should call AddAccount with correct values', async () => {
    const { sut, addSignupStub } = await makeSut();
    const addAccountSpy = jest.spyOn(addSignupStub, 'execute');
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
    const { sut, addSignupStub } = await makeSut();
    jest.spyOn(addSignupStub, 'execute').mockImplementationOnce(() => {
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
    expect(response.body).toEqual(new ServerError().message);
  });

  it('should return 409 if User already exists', async () => {
    const { sut, addSignupStub } = await makeSut();
    jest.spyOn(addSignupStub, 'execute').mockImplementationOnce(() => {
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
    expect(response.statusCode).toBe(409);
    expect(response.body).toEqual(new UserAlreadyExistsError().message);
  });

  it('should return 201 if account is created successfully', async () => {
    const { sut } = await makeSut();
    const request = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword',
        confirmationPassword: 'anypassword',
      },
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual('valid_email@mail.com');
    expect(typeof response.body).toBe('string');
  });
});
