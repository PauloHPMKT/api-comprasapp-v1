import { Test, TestingModule } from '@nestjs/testing';
import { SignupController } from './signup.controller';

const makeSut = async (): Promise<SutTypes> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [SignupController],
  }).compile();
  const sut = moduleRef.get<SignupController>(SignupController);
  return { sut };
};

type SutTypes = {
  sut: SignupController;
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
        email: 'anyemail@mail.com',
        password: 'anypassword',
        confirmPassword: 'anypassword',
      },
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error('Missing param name'));
  });

  it('should return 400 if no email is provided', async () => {
    const { sut } = await makeSut();
    const request = {
      body: {
        name: 'anyname',
        password: 'anypassword',
        confirmPassword: 'anypassword',
      },
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error('Missing param email'));
  });
});
