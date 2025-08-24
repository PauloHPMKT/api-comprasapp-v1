export type CategoryProps = {
  accountId: string;
};

export class Category {
  constructor(public readonly props: CategoryProps) {}
}
