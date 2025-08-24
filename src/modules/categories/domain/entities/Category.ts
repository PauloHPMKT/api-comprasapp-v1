export type CategoryProps = {
  accountId: string;
  name: string;
  emoji: string;
  createdAt?: Date;
};

export class Category {
  constructor(public readonly props: CategoryProps) {
    this.props.createdAt = props.createdAt ?? new Date();
  }
}
