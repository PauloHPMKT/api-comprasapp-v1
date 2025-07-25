export type UserProps = {
  name: string;
  email: string;
  avatar?: string | null;
  createdAt?: Date;
};

export class User {
  constructor(public readonly props: UserProps) {
    this.props.avatar = this.props.avatar ?? null;
    this.props.createdAt = this.props.createdAt ?? new Date();
  }
}

console.log(
  'User entity loaded',
  new User({
    name: 'Test User',
    email: 'any_email@mail.com',
  }),
);
