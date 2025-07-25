import { InvalidIdError } from '@/shared/errors/invalid-id-error';
import { randomBytes } from 'crypto';
import ValueObject from './value-object';

export default class UniqueEntityId extends ValueObject<string> {
  constructor(public readonly id?: string) {
    const idValue = id || randomBytes(12).toString('hex');
    super(idValue);
    this.validate();
  }

  private validate() {
    const hexStringRegex = /^[0-9a-f]{24}$/i;
    if (!hexStringRegex.test(this.value)) {
      throw new InvalidIdError();
    }
  }
}
