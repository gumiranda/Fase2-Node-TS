import faker from 'faker-br';
import { Encrypter } from '@/bin/protocols/cryptography/encrypter';
import { HashComparer } from '@/bin/protocols/cryptography/hash-comparer';

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    hashedText = faker.random.uuid();
    plaintext: string;
    async encrypt(plaintext: string): Promise<string> {
      this.plaintext = plaintext;
      return new Promise((resolve) => resolve(this.hashedText));
    }
  }
  return new EncrypterStub();
};
export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    password: string;
    hashedText: string;
    isValid = true;
    async compare(password: string, hashedText: string): Promise<boolean> {
      this.password = password;
      this.hashedText = hashedText;
      return new Promise((resolve) => resolve(this.isValid));
    }
  }
  return new HashComparerStub();
};
