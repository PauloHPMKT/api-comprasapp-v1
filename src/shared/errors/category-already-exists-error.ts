export class CategoryAlreadyExistsError extends Error {
  constructor(categoryName: string) {
    super(`Uma categoria com o nome ${categoryName} já existe!`);
    this.name = 'CategoryAlreadyExistsError';
  }
}
