export type UserProps = {
  name: string;
  email: string;
  avatar?: string | null;
};

export class User {
  constructor(public readonly props: UserProps) {
    this.props.avatar = this.props.avatar ?? null;
  }
}

console.log(
  'User entity loaded',
  new User({
    name: 'Test User',
    email: 'any_email@mail.com',
  }),
);
