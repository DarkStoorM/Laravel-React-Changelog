import { TFormValidationError } from "./TFormValidationError";

export type TAxiosErrorResponse<T> = { errors: TFormValidationError<T> };
