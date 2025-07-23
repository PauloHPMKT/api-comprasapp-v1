import deepFreeze from './deep-freeze';

describe('Object deepFreeze Utility', () => {
  it('should not freeze a scalar string value', () => {
    const str = deepFreeze('test');
    expect(typeof str).toBe('string');
  });

  it('should not freeze a scalar boolean value', () => {
    const bool = deepFreeze(true);
    expect(typeof bool).toBe('boolean');
  });

  it('should not freeze a scalar number value', () => {
    const num = deepFreeze(42);
    expect(typeof num).toBe('number');
  });

  it('should freeze an object and its nested objects', () => {
    const obj = {
      prop1: 'value1',
      deep: { prop2: 'value2', prop3: new Date() },
    };
    const frozenObj = deepFreeze(obj);
    expect(() => {
      (obj as any).prop1 = 'test';
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'",
    );
    expect(Object.isFrozen(frozenObj)).toBe(true);
    expect(() => {
      (obj as any).deep.prop2 = 'test';
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'",
    );
    expect(frozenObj.deep.prop3).toBeInstanceOf(Date);
  });
});
