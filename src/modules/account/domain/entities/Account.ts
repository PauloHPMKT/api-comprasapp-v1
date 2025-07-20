type AccountProps = {
  plan?: Account.Plan;
};
export class Account {
  constructor(public readonly props: AccountProps) {
    this.props.plan = props.plan || Account.Plan.FREE;
  }
}

export namespace Account {
  export enum Plan {
    FREE = 'free',
    PREMIUM = 'premium',
  }
}
