type AccountProps = {
  plan?: Account.Plan;
  isActive?: boolean;
  userId?: string | null;
};
export class Account {
  constructor(public readonly props: AccountProps) {
    this.props.plan = props.plan || Account.Plan.FREE;
    this.props.isActive = props.isActive ?? true;
    this.props.userId = props.userId ?? null;
  }
}

export namespace Account {
  export enum Plan {
    FREE = 'free',
    PREMIUM = 'premium',
  }
}
