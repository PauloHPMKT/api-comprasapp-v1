import Entity from '@/shared/@seedworks/domain/entity/entity';
import UniqueEntityId from '@/shared/@seedworks/domain/value-objects/unique-entity-id';

export type UserProps = {
  name: string;
  email: string;
  avatar?: string | null;
  createdAt?: Date;
};

export class User extends Entity<UserProps> {
  constructor(
    public override readonly props: UserProps,
    id?: UniqueEntityId,
  ) {
    super(props, id);
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
