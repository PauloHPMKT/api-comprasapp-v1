import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokenAdapter } from '../jwt-adapter';

const makeSut = async (): Promise<SutTypes> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [JwtTokenAdapter],
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
});
