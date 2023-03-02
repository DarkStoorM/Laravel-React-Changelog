export interface IApiResponse<T> {
  isOk: boolean;
  data: T;
  error?: string | string[];
}
