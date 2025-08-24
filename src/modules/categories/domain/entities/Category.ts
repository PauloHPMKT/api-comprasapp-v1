import Entity from '@/shared/@seedworks/domain/entity/entity';
import UniqueEntityId from '@/shared/@seedworks/domain/value-objects/unique-entity-id';

export type CategoryProps = {
  accountId: string;
  name: string;
  emoji: string;
  createdAt?: Date;
};

export class Category extends Entity<CategoryProps> {
  constructor(
    public override readonly props: CategoryProps,
    id?: UniqueEntityId,
  ) {
    super(props, id);
    this.props.createdAt = props.createdAt ?? new Date();
  }
}
