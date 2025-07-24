import { Provider } from '@nestjs/common';
import { UserRepository } from '../../data/ports/is-exists-user.repository';

export const makeIsExistsUserProvider = (): Provider[] => [
  {
    provide: 'IsExistsUserRepositoryPort',
    useClass: UserRepository,
  },
];
