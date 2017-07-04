export interface IHttpMessage {
  code: number;
  message: string;
  data?: string | object;
}

export interface IUser {
  id: string;
  name: string;
  password: string;
  role: string;
}

export interface IToken {
  id: string;
  uid: string;
  token: string;
  last_login_at: Date;
}