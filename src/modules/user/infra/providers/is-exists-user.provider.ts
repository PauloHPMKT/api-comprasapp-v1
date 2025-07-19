import { Provider } from '@nestjs/common';
import { UserRepository } from '../../domain/ports/is-exists-user.repository';

export const makeIsExistsUserProvider = (): Provider[] => [
  {
    provide: 'IsExistsUserRepositoryPort',
    useClass: UserRepository,
  },
];
