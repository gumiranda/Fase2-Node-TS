import { Encrypter } from '@/bin/protocols/cryptography/encrypter';
import { HashComparer } from '@/bin/protocols/cryptography/hash-comparer';
import bcrypt from 'bcrypt';


export class BcryptAdapter implements Encrypter, HashComparer {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }
  plaintext: string;
  hashedPassword: string;
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  }
  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }
}
