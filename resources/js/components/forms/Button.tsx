import React from "react";

interface IButtonProps {
  buttonId: string;
  clickEvent?: React.MouseEventHandler<HTMLButtonElement>;
  defaultState: string;
  isButtonDisabled: boolean;
  additionalStyles?: string;
}

/**
 * Represents a regular button with an onClick event callback
 */
export function FormButton({
  buttonId,
  isButtonDisabled,
  defaultState,
  clickEvent,
  additionalStyles,
}: IButtonProps) {
  return (
    <button
      id={buttonId}
      onClick={clickEvent}
      className={`input input--small ${additionalStyles ?? ""}`}
      disabled={isButtonDisabled}
    >
      {isButtonDisabled ? "..." : defaultState}
    </button>
  );
}
