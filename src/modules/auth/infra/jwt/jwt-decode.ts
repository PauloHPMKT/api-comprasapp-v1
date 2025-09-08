import { TokenDecrypter } from '../../data/decode-token';

export class JwtTokenDecrypterAdapter implements TokenDecrypter {
  decrypt(token: string): any {
    console.log('Decrypting token:', token);
    return { accountId: 'decodedUserId' };
  }
}
