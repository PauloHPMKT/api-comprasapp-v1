export const mocksSigninParams = () => ({
  validateUserCredentialsStub: {
    validate: jest.fn().mockResolvedValue({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      avatar: null,
      userId: 'valid_user_id',
      plan: 'free',
      createdAt: new Date('2025-09-27T01:56:39.666Z'),
    }),
  },
  findUserIdByEmailStub: {
    findByEmail: jest.fn().mockResolvedValue({ id: 'any_user_id' }),
  },
  generateTokenStub: {
    generate: jest.fn().mockResolvedValue({ accessToken: 'valid_token' }),
  },
});
