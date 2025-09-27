export const makeValidateUserServiceMock = () => ({
  getAccountByUserIdRepositoryPortStub: {
    getAccount: jest.fn().mockResolvedValue({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      avatar: null,
      accountId: 'valid_account_id',
      plan: 'free',
      createdAt: new Date('2025-09-27T01:56:39.666Z'),
    }),
  },
  compareIfPasswordIsValidStub: {
    compare: jest.fn().mockResolvedValue(true),
  },
});
