
export interface JwtTokenSignerParams {
  payload: Record<string, any>;
  secret: string;
  expiresIn: Date;
  issuer: string;
  subject: string;
  audience?: string | string[];
  notBefore: Date;
  jwtId: string;
}

export class JwtTokenSignerError extends Error {
  constructor(
    private code: string,
    message: string,
  ) { super(message); }
}

export default abstract class AbsJwtTokenSigner {

  sign(value: JwtTokenSignerParams): string {
    try {
      const token = this.onSign(value);
      return token;
    } catch (error) {
      throw new JwtTokenSignerError('token_signing_failed', `Failed to sign the token: ${error.toString()}`);
    }
  }

  abstract onSign(value: JwtTokenSignerParams): string;
}