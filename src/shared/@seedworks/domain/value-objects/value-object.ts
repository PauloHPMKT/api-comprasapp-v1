import deepFreeze from '@/shared/utils/deep-freeze';

export default abstract class ValueObject<Value = any> {
  protected readonly _value: Value;

  constructor(value: Value) {
    console.log('ValueObject constructor called with value:', value);
    this._value = deepFreeze(value);
  }

  get value(): Value {
    return this._value;
  }

  toString = () => {
    if (typeof this.value !== 'object' || this.value === null) {
      try {
        return this.value.toString();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return this.value + '';
      }
    }

    const valueStr = this.value.toString();
    return valueStr === '[object Object]'
      ? JSON.stringify(this.value)
      : valueStr;
  };
}
