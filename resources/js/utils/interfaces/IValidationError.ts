/**
 * Describes an object returned by Laravel's FormRequest Validation
 */
export interface IValidationError {
  message: string;
  errors: Record<string, string>;
}
