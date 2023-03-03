import React from "react";
import { IDropdownProps } from "../../utils/interfaces/IDropdownProps";

/**
 * Creates a Select Element with a dynamically constructed list of options defined in the
 * `props.options: string[]`.
 *
 * @param props Object of HTMLSelect reference and an array of options
 */
export function Dropdown(props: IDropdownProps) {
  const { options, reference } = props;

  return (
    <>
      <select ref={reference} className="input">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
