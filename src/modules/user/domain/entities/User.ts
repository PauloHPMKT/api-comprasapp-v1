export type UserProps = {
  name: string;
  email: string;
};

export class User {
  constructor(public readonly props: UserProps) {}
}

console.log(
  'User entity loaded',
  new User({
    name: 'Test User',
    email: 'any_email@mail.com',
  }),
);
