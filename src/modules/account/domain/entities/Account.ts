import UniqueEntityId from '@/shared/@seedworks/domain/value-objects/unique-entity-id';

type AccountProps = {
  plan?: Account.Plan;
  isActive?: boolean;
  userId?: string | null;
  password: string;
  createdAt?: Date;
};
export class Account {
  public readonly id: UniqueEntityId;
  constructor(
    public readonly props: AccountProps,
    id?: UniqueEntityId,
  ) {
    this.id = id || new UniqueEntityId();
    this.props.plan = props.plan || Account.Plan.FREE;
    this.props.isActive = props.isActive ?? true;
    this.props.userId = props.userId ?? null;
    this.props.createdAt = props.createdAt ?? new Date();
  }
}

export namespace Account {
  export enum Plan {
    FREE = 'free',
    PREMIUM = 'premium',
  }
}

console.log(
  new Account({
    password: 'secure_password',
  }),
);
