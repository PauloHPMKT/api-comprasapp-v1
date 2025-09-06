import { Test, TestingModule } from '@nestjs/testing';
import { AuthTokenMiddleware, TokenDecrypter } from './auth-token-middleware';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

const makeMocks = () => ({
  tokenDecrypterMock: {
    decrypt: jest.fn().mockReturnValue('decoded_token'),
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

  it('should throw UnauthorizedException if no authorization is provided', async () => {
    const { sut } = await makeSut();
    const req: Request = { headers: {} } as any;
    const res = {} as any;
    const next = jest.fn();

    expect(() => sut.use(req, res, next)).toThrow('Token not provided');
    expect(() => sut.use(req, res, next)).toThrow(UnauthorizedException);
  });
});
