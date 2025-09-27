import * as json from 'jsonwebtoken';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokenAdapter } from '../jwt-adapter';
import { ToJwtTokenPayloadModel } from '@/modules/auth/data/models/token-payload';
import { EnvConfigService } from '@/shared/env-config/env-config.service';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('any_token'),
  verify: jest.fn().mockReturnValue({ sub: 'any_id' }),
}));

const depsMocks = () => ({
  envConfigServiceMock: {
    getEnv: jest.fn().mockReturnValue('any_secret'),
  },
});

const makeSut = async (): Promise<SutTypes> => {
  const { envConfigServiceMock } = depsMocks();
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      JwtTokenAdapter,
      { provide: EnvConfigService, useValue: envConfigServiceMock },
    ],
  }).compile();
  const sut = moduleRef.get<JwtTokenAdapter>(JwtTokenAdapter);
  return {
    sut,
  };
};

type SutTypes = {
  sut: JwtTokenAdapter;
};

describe('JwtServiceAdapter', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(JwtTokenAdapter);
  });

  it('should call jwt verify to decrypt a token', async () => {
    const { sut } = await makeSut();
    const verifySpy = jest.spyOn(json, 'verify');
    const token = sut.decrypt('any_token');
    expect(verifySpy).toHaveBeenCalledWith('any_token', 'any_secret');
    expect(token).toEqual({ sub: 'any_id' });
  });

  it('should call jwt sign to generate a valid token', async () => {
    const { sut } = await makeSut();
    const signSpy = jest.spyOn(json, 'sign');
    const payload: ToJwtTokenPayloadModel.Params = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      avatar: null,
      userId: 'any_user_id',
      plan: 'free',
      createdAt: new Date('2025-09-27T01:56:39.666Z'),
    };
    const { accessToken } = await sut.generate(payload);
    expect(signSpy).toHaveBeenCalledWith(
      {
        sub: 'any_id',
        name: 'any_name',
        email: 'any_email',
        avatar: null,
        userId: 'any_user_id',
        plan: 'free',
        createdAt: new Date('2025-09-27T01:56:39.666Z'),
      },
      expect.any(String),
      { expiresIn: '30h' },
    );
    expect(accessToken).toBe('any_token');
    expect(typeof accessToken).toBe('string');
    expect(accessToken.length).toBeGreaterThan(0);
  });
});
