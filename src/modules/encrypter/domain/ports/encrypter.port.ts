export interface EncrypterPort {
  hash(data: string): Promise<string>;
}
