export namespace CreateUserModel {
  export type Params = {
    name: string;
    email: string;
  };

  export type Result = {
    email: string;
    id: string;
  };
}
