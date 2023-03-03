import { IParsedJsonResponse } from "./IParsedJsonResponse";

/**
 * Describes the structure of a response returned by custom `Fetch`.
 */
export interface IApiResponse<T> extends IParsedJsonResponse<T> {
  /**
   * Flag set by `Fetch` describing if the server returned a status 200~.
   *
   * Used to catch Server errors
   */
  isOk: boolean;
  /**
   * Array containing eventual error messages returned by the server
   */
  error?: string | string[];
}
