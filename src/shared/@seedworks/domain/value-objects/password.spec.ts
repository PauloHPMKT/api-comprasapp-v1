import { Password } from './Password';

describe('Password Value Object', () => {
  it('should throw error if password not match criteria', () => {
    expect(() => new Password('123')).toThrow(
      'Password must be at least 6 characters long',
    );
  });
});
