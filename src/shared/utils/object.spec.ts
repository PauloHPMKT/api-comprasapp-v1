import { deepFreeze } from './object';

describe('Object deepFreeze Utility', () => {
  it('should not freeze a scalar string value', () => {
    const str = deepFreeze('test');
    expect(typeof str).toBe('string');
  });

  it('should not freeze a scalar boolean value', () => {
    const bool = deepFreeze(true);
    expect(typeof bool).toBe('boolean');
  });
});
