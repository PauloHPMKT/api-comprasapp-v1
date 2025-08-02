import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from './env-config.service';
import { EnvConfigModule } from './env-config.module';

const makeSut = async (): Promise<SutTypes> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [EnvConfigModule.forRoot()],
    providers: [EnvConfigService],
  }).compile();

  const sut = moduleRef.get<EnvConfigService>(EnvConfigService);

  return { sut };
};

type SutTypes = {
  sut: EnvConfigService;
};

describe('EnvConfigService', () => {
  beforeAll(() => {
    process.env.PORT = '3010';
  });

  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(EnvConfigService);
  });

  it('should return variable PORT as number', async () => {
    const { sut } = await makeSut();
    const appPort = sut.getEnv<number>('PORT');
    expect(appPort).toEqual('3010');
  });

  it('should throw error if variable is not defined', async () => {
    const { sut } = await makeSut();
    expect(() => sut.getEnv('ANOTHER_VARIABLE')).toThrow(
      new Error('Environment variable ANOTHER_VARIABLE is not defined'),
    );
  });
});
