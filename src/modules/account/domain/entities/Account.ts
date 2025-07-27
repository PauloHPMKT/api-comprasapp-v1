import Entity from '@/shared/@seedworks/domain/entity/entity';
import UniqueEntityId from '@/shared/@seedworks/domain/value-objects/unique-entity-id';

type AccountProps = {
  plan?: Account.Plan;
  isActive?: boolean;
  userId: string;
  password: string;
  createdAt?: Date;
};
export class Account extends Entity<AccountProps> {
  constructor(
    public override readonly props: AccountProps,
    id?: UniqueEntityId,
  ) {
    super(props, id);
    this.props.plan = props.plan || Account.Plan.FREE;
    this.props.isActive = props.isActive ?? true;
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
    userId: '507f1f77bcf86cd799439012',
    password: 'secure_password',
  }).toJSON(),
);
