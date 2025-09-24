export namespace AuthModel {
  export interface Signin {
    email: string;
    password: string;
  }

  export interface SigninResult {
    accessToken: string;
  }
}
