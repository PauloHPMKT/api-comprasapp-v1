import { Category as CategoryEntity } from '../../domain/entities/Category';

export namespace ToRepositoryModel {
  export type Category = ReturnType<CategoryEntity['toJSON']>;
}
