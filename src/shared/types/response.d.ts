export interface TReturnObj<T = object> {
  statusCode: number;
  message: string[];
  data?: any;
}
