import { InvalidIdError } from '@/shared/errors/invalid-id-error';
import { randomBytes } from 'crypto';

export default class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id || randomBytes(12).toString('hex');
    this.validate();
  }

  private validate() {
    const hexStringRegex = /^[0-9a-f]{24}$/i;
    if (!hexStringRegex.test(this.id)) {
      throw new InvalidIdError();
    }
  }
}
