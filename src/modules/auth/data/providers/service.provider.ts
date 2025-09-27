import { Provider } from '@nestjs/common';
import { ValidateUserService } from '../../domain/services/validate-user.service';
import { CompareIfPasswordIsValid } from '@/modules/encrypter/domain/ports/compare-if-password-is-valid';

class CompareIfPasswordIsValidAdapter implements CompareIfPasswordIsValid {
  async compare(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    console.log(inputPassword, hashedPassword);
    throw new Error('Method not implemented.');
  }
}

export const makeServiceProvider = (): Provider[] => [
  {
    provide: 'VALIDATE_USER_CREDENTIALS',
    useClass: ValidateUserService,
  },
  {
    provide: 'COMPARE_IF_PASSWORD_IS_VALID',
    useClass: CompareIfPasswordIsValidAdapter,
  },
];
