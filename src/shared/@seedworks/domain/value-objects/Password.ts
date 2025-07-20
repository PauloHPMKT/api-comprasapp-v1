export class Password {
  private readonly minLength = 6;

  constructor(public readonly _value?: string) {
    this._value = _value;
    this.validate(this._value);
  }

  validate(password: string): void {
    if (password.length < this.minLength) {
      throw new Error(
        `Password must be at least ${this.minLength} characters long`,
      );
    }
  }

  get value(): string {
    return this._value;
  }
}
