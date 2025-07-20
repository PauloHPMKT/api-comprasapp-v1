import { deepFreeze } from './object';

describe('Object deepFreeze Utility', () => {
  it('should not freeze a scalar value', () => {
    const str = deepFreeze('test');
    expect(typeof str).toBe('string');
  });
});
