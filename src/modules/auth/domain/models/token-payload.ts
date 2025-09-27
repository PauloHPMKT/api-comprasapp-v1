export namespace TokenPayloadModel {
  export interface Params {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    userId: string;
    plan: string;
    createdAt: Date;
  }

  export type Result = Params & { password?: string | null };
}
