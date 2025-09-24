export const makeAuthControllerMocks = () => ({
  signinStub: {
    execute: jest.fn().mockResolvedValue({ accessToken: 'valid_token' }),
  },
});
