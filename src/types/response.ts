export interface Response<T = object> {
  success: boolean;
  code: number;
  message: string;
  payload: T;
}
