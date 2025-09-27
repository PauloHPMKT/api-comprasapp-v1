export namespace TokenPayloadModel {
  export interface Params {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    accountId: string;
    plan: string;
    createdAt: Date;
  }
}
