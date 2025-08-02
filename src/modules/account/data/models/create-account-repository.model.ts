import { Account } from '../../domain/entities/Account';

export namespace CreateAccountRepositoryModel {
  export type Params = ReturnType<Account['toJSON']>;
  export type Result = {
    id: string;
  };
}
