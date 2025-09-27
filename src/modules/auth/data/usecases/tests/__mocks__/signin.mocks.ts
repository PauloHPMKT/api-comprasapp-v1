export const mocksSigninParams = () => ({
  validateUserCredentialsStub: {
    validate: jest.fn().mockResolvedValue(true),
  },
  findUserIdByEmailStub: {
    findByEmail: jest.fn().mockResolvedValue('any_user_id'),
  },
});
