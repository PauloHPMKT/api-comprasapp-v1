import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountUseCase } from './create-account';

const makeMocks = () => ({
  isAccountActiveStub: {
    checkAccountByStatus: jest.fn().mockReturnValue(true),
  },
});

const makeSut = async (): Promise<SutTypes> => {
  const { isAccountActiveStub } = makeMocks();
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      CreateAccountUseCase,
      {
        provide: 'IsAccountActivePort',
        useValue: isAccountActiveStub,
      },
    ],
  }).compile();
  const sut = moduleRef.get<CreateAccountUseCase>(CreateAccountUseCase);
  return { sut, isAccountActiveStub };
};

type SutTypes = {
  sut: CreateAccountUseCase;
  isAccountActiveStub: { checkAccountByStatus: jest.Mock };
};

describe('CreateAccountUseCase', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreateAccountUseCase);
    expect(sut).toBeTruthy();
  });

  it('should thorw an exception if account is not active', async () => {
    const { sut, isAccountActiveStub } = await makeSut();
    jest
      .spyOn(isAccountActiveStub, 'checkAccountByStatus')
      .mockReturnValueOnce(false);
    const params = {
      userId: 'valid_user_id',
      password: 'any_password',
    };
    await expect(sut.execute(params)).rejects.toThrow('Account is not active');
  });
});
