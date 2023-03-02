/**
 * JsonResponse in laravel contains an object, which is always of type `{ data: T }`,
 * so this interface is used to expose the `data` key to the components fetching data
 */
export interface IParsedJsonResponse<T> {
  data: T;
}
