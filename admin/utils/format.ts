import { IHttpMessage } from "../interfaces";

export const formatMessage = (
  code: number = 200,
  message: string = 'success',
  data?: any
): IHttpMessage => {
  return {
    code,
    message,
    data
  }
}
