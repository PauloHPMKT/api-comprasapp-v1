export const mocksSigninParams = () => ({
  validateUserCredentialsStub: {
    validate: jest.fn().mockResolvedValue(true),
  },
});
