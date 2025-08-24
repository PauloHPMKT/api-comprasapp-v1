export type CategoryProps = {
  accountId: string;
  name: string;
};

export class Category {
  constructor(public readonly props: CategoryProps) {}
}
