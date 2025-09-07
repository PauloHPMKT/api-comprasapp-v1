import UniqueEntityId from '@/shared/@seedworks/domain/value-objects/unique-entity-id';
import { Category as CategoryEntity } from '../../domain/entities/Category';

export namespace ToRepositoryModel {
  export type Category = ReturnType<CategoryEntity['toJSON']>;
  export interface Result {
    id: UniqueEntityId;
    name: string;
  }
}
