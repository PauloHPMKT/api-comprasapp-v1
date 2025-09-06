import { Test, TestingModule } from '@nestjs/testing';
import { AuthTokenMiddleware, TokenDecrypter } from './auth-token-middleware';

const makeMocks = () => ({
  tokenDecrypterMock: {
    decrypt: jest.fn(),
  },
});

export const makeSut = async (): Promise<SutTypes> => {
  const { tokenDecrypterMock } = makeMocks();
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      AuthTokenMiddleware,
      {
        provide: 'TOKEN_DECRYPTER',
        useValue: tokenDecrypterMock,
      },
    ],
  }).compile();
  const sut = moduleRef.get<AuthTokenMiddleware>(AuthTokenMiddleware);
  return { sut, tokenDecrypterMock };
};

type SutTypes = {
  sut: AuthTokenMiddleware;
  tokenDecrypterMock: { decrypt: jest.Mock<TokenDecrypter> };
};

describe('AuthTokenMiddleware', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(AuthTokenMiddleware);
  });
});
