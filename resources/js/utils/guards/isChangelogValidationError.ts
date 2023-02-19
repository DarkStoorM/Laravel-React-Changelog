import { TAxiosErrorResponse } from "../types/TAxiosErrorResponse";
import { TChangelogProps } from "../types/TChangelogProps";

/**
 * A test type guard to check if the provided error comes from Laravel's Validator,
 * which contains `errors` key in it's bag. This is not necessarily a validation
 * ErrorBag, because we can append custom messages in Laravel.
 */
export function isChangelogValidationError(
  rejection: unknown
): rejection is TAxiosErrorResponse<TChangelogProps> {
  if (typeof rejection !== "object" || rejection === null) {
    return false;
  }

  return Object.keys(rejection).includes("errors");
}
