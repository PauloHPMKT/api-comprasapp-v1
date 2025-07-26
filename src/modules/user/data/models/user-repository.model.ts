import { User } from '../../domain/entities/User';

export namespace CreateUserRepositoryModel {
  export type Params = ReturnType<User['toJSON']>;

  export type Result = {
    id: string;
    email: string;
  };
}
