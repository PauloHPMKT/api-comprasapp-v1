export namespace CreateCategoryModel {
  export interface Params {
    accountId: string;
    name: string;
    emoji: string;
  }

  export interface Result {
    id: string;
    name: string;
  }
}
