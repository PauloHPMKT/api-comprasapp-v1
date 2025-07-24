//transformar em uma entidade
export namespace CreateUserModel {
  export type Params = {
    name: string;
    email: string;
    password: string;
    confirmationPassword: string;
  };

  export type Result = {
    email: string;
    id: string;
  };
}

export interface CreateUserPort {
  execute(params: CreateUserModel.Params): Promise<CreateUserModel.Result>;
}
