import { token } from "../../app";
import { IParsedJsonResponse } from "../interfaces/IParsedJsonResponse";
import { IApiResponse } from "../interfaces/IApiResponse";
import { IValidationError } from "../interfaces/IValidationError";
import { TRequestMethod } from "../types/TRequestMethod";

/**
 * Alias to regular `fetch` for Requests with an Error Wrapper. Response Errors from Laravel
 * can come in different shapes, which sadly, require a bunch of different handling methods
 *
 * @param   {string}   uri  Endpoint URI
 *
 * @template ReturnedDataType Type of the Data, that comes back from the fetch response, when successful
 */
export async function fetchRequest<ReturnedDataType>(
  uri: string,
  method: TRequestMethod = "get",
  body = ""
): Promise<IApiResponse<ReturnedDataType>> {
  try {
    const response = await fetch(uri, {
      method,
      /* GET|HEAD can not have a body, so append it only for other methods */
      ...(method !== "get" && { body }),
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token,
        "Content-Type": "application/json",
      },
    });

    // NOTICE: In case a `dd()` was left somewhere in Laravel, a VarDumper content will
    // be returned by the server, which is not a JsonResponse and is not processable
    // by .json(). It's basically an HTML script tag, which formats the var_dump() contents,
    // so it has to be
    const data = await response.json().catch(() => {
      throw new Error("An error occurred while trying to fetch JSON data");
    });

    // Server Errors (<500) will not get caught, so we have to check if the response
    // was `ok` to catch all errors
    if (!response.ok) {
      const responseError = getResponseError(data);

      if (typeof responseError === "object" && "message" in responseError) {
        // The response may also contain laravel's FormRequest Validation errors, which are
        // in a separate object containing a Message and Errors array
        if ("errors" in responseError) {
          Object.assign(response, {
            serverMessage: extractValidationErrors(responseError as IValidationError),
          });
        }
      }

      // Throw this response to the Catch block on purpose, so we can then use this instance to
      // retrieve the status code and message separately
      throw response;
    }

    /*
     * --------------------------------------------------------------------------
     * Laravel Controller Response
     * --------------------------------------------------------------------------
     *
     * Laravel returns a json encoded string, hence the force-cast to
     * string, then T. That response always comes in a form of an object
     * containing `data` key: { data: T }.
     *
     * There are exceptions, where we return a FormRequest Validation Error, but
     * that has to be handled by the `OK Response Status` check
     */
    const responseData = JSON.parse(data as string) as IParsedJsonResponse<ReturnedDataType>;

    return {
      isOk: true,
      data: "data" in responseData ? responseData.data : responseData,
    };
  } catch (error) {
    let errorMessage: string | string[] = ``;

    /*
     * --------------------------------------------------------------------------
     * Error Transformation
     * --------------------------------------------------------------------------
     *
     * Most of the Errors will be transformed to the `Response` type, which then
     * will be used to construct an error message, that consists of a StatusCode
     * + Message. Sometimes, an internal exception can be thrown by Laravel,
     * which then will not be of this type, but a generic json response with an
     * Object containing the Laravel's error response (instanceof Error)
     */
    if (error instanceof Response) {
      if ("serverMessage" in error) errorMessage = error.serverMessage as string | string[];
      else errorMessage = `[${error.status}] - ${error.statusText}`;
    }

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    /*
     * --------------------------------------------------------------------------
     * json() await exception
     * --------------------------------------------------------------------------
     *
     * If the error message was still empty, it means we've come across a Laravel
     * Dump or an unexpected exit, so just get the error thrown by json() catch,
     * which we already have thrown as a string.
     *
     * This only occurs if the server responded with a non-json content, which
     * comes mostly from Laravel's Dump - a raw HTML with formatted data
     */
    if (errorMessage === "") {
      errorMessage = error as string;
    }

    console.error(errorMessage);

    return {
      isOk: false,
      /* Left on purpose so we don't have to perform null checks/casts or add type guards */
      data: {} as ReturnedDataType,
      /*
       * This will be present in case there are custom errors, that Components should render.
       * Most of the time it won't be used, rather logged to the console
       */
      error: errorMessage,
    };
  }
}

/**
 * Returns the error body from the given data coming from JsonResponse.
 *
 * This response will come in `object` form if the request was aborted by FormRequest
 * and as a string in the remaining cases
 *
 * @param   {unknown}  data  JSON data returned by the server
 */
function getResponseError(data: unknown): object {
  if (typeof data === "string") {
    return JSON.parse(data) as object;
  }

  return data as object;
}

function extractValidationErrors(formValidationError: IValidationError): string | string[] {
  const validationKeys = Object.keys(formValidationError.errors);

  // If the FormRequest validation errors object contained only one entry, there is no need
  // to map it into an array of errors, so we will return just this one message
  if (validationKeys.length === 1) {
    return formValidationError.message;
  }

  return validationKeys.map((errorKey) => formValidationError.errors[errorKey]);
}
