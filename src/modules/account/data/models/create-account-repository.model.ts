import { Account } from '../../domain/entities/Account';

export namespace CreateAccountRepositoryModel {
  export type Params = ReturnType<Account['toJSON']>;
}
