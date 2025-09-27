import { Test, TestingModule } from '@nestjs/testing';
import { ValidateUserService } from '../../validate-user.service';

export const makeValidateUserSut = async (): Promise<SutTypes> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [],
    providers: [ValidateUserService],
  }).compile();

  const sut = moduleRef.get<ValidateUserService>(ValidateUserService);
  return { sut };
};

type SutTypes = {
  sut: ValidateUserService;
};
