export namespace AddAccountModel {
  export type Params = {
    userId: string;
    password: string;
  };
}

export interface CreateAccountPort {
  execute(params: AddAccountModel.Params): Promise<void>;
}
