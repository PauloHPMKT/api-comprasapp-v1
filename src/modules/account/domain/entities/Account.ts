import { randomBytes } from 'crypto';

type AccountProps = {
  plan?: Account.Plan;
  isActive?: boolean;
  userId?: string | null;
  password: string;
  createdAt?: Date;
};
export class Account {
  public readonly id: string;
  constructor(
    public readonly props: AccountProps,
    id?: string,
  ) {
    this.id = id || randomBytes(16).toString('hex');
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
