import { Test, TestingModule } from '@nestjs/testing';
import { AddSignupUseCase } from './add-signup';

const makeSut = async (): Promise<SutTypes> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      AddSignupUseCase,
      {
        provide: 'IsExistsUserRepositoryPort',
        useValue: {
          exists: jest.fn().mockResolvedValue(false),
        },
      },
      {
        provide: 'EncrypterPort',
        useValue: {
          hash: jest.fn().mockResolvedValue('hashed_password'),
        },
      },
    ],
  }).compile();
  const sut = moduleRef.get<AddSignupUseCase>(AddSignupUseCase);
  return { sut };
};

type SutTypes = {
  sut: AddSignupUseCase;
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
});
