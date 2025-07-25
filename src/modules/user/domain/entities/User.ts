type UserProps = {
  name: string;
};

export class User {
  constructor(public readonly props: UserProps) {}
}

console.log('User entity loaded', new User({ name: 'Test User' }));
