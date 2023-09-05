import { v4 } from 'uuid';
import AbsJwtTokenSigner, { JwtTokenSignerParams, JwtTokenSignerError } from "./token-signer.abs";


class TokenSignerMock extends AbsJwtTokenSigner {

  onSign(value: JwtTokenSignerParams): string {
    return 'token';
  }

}

describe('TokenSigner', () => {

  test('Expect method "onSign" is called with correct parameters', () => {
    const signer = new TokenSignerMock();
    const spiedOnSign = jest.spyOn(signer, 'onSign');
    const params: JwtTokenSignerParams = {
      payload: {
        sid: 'session-id',
        aid: 'account-id',
        sub: 'user@gmail.com'
      },
      secret: 'secret',
      expiresIn: new Date(),
      notBefore: new Date(),
      jwtId: v4(),
      issuer: 'http://auth-example.com',
      subject: 'user@gmail.com',
      audience: 'mobile',
    };
    signer.sign(params);
    expect(spiedOnSign).toHaveBeenNthCalledWith(1, params);
  });

  test('Expect to throw an error', () => {
    const signer = new TokenSignerMock();
    const spiedOnSign = jest.spyOn(signer, 'onSign');
    spiedOnSign.mockImplementation(() => {
      throw Error('A mock error');
    })
    const params: JwtTokenSignerParams = {
      payload: {
        sid: 'session-id',
        aid: 'account-id',
        sub: 'user@gmail.com'
      },
      secret: 'secret',
      expiresIn: new Date(),
      notBefore: new Date(),
      jwtId: v4(),
      issuer: 'http://auth-example.com',
      subject: 'user@gmail.com',
      audience: 'mobile',
    };

    expect(() => signer.sign(params)).toThrow(new JwtTokenSignerError('token_signing_failed', `Failed to sign the token: Error: A mock error`))
  });

});