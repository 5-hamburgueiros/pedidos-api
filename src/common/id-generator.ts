import * as crypto from 'crypto';

export class IdGenerator {
  public static Generate(): string {
    return crypto.randomUUID();
  }
}
