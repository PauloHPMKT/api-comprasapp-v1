export interface TokenDecrypter<T = any> {
  decrypt(token: string): string | T;
}
