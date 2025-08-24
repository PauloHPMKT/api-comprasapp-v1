export type CategoryProps = {
  accountId: string;
  name: string;
  emoji: string;
};

export class Category {
  constructor(public readonly props: CategoryProps) {}
}
