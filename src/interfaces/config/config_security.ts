
export default interface IConfigSecurity {
  password: IConfigSecurityPassword;
  authentication: IConfigSecurityAuthentication;
}

export interface IConfigSecurityPassword {
  salt: number;
}

export interface IConfigSecurityAuthentication {
  jwt_secret: string;
  access_token: IConfigSecurityAuthenticationToken;
  refresh_token: IConfigSecurityAuthenticationToken;
}

export interface IConfigSecurityAuthenticationToken {
  duration: string;
}