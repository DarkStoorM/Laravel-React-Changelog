import { TFormValidationError } from "../../types/TFormValidationError";
import React from "react";

/**
 * Maps all validation errors that came from Laravel's FormRequest validator. All errors come
 * in a message bag, which is an object of keyed string arrays
 * @param messageBag
 * @returns
 */
export function getValidationErrors<T>(messageBag: TFormValidationError<T>) {
  const messages: JSX.Element[] = [];

  for (const key in messageBag) {
    // Thanks, TypeScript 🥴...
    if (!(key in messageBag)) continue;

    messageBag[key as keyof TFormValidationError<T>].map((message) => {
      messages.push(<div>{message}</div>);
    });
  }

  return <>{messages}</>;
}
