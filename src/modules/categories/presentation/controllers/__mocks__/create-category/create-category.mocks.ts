export const makcMocks = () => ({
  createCategoryStub: {
    execute: jest.fn().mockResolvedValue({
      id: 'any_category_id',
      name: 'any_category_name',
    }),
  },
});
