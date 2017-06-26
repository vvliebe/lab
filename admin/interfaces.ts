export interface IHttpMessage {
  code: number;
  message: string;
  data?: string | object;
}