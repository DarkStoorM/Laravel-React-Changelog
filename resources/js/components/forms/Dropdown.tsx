import React from "react";
import { IDropdownProps } from "../../utils/interfaces/IDropdownProps";

/**
 * Creates a Select Element with a dynamically constructed list of options defined in the
 * `props.options: string[]`.
 *
 * If `labeledAs` was passed along with the props, will render a label with the specified text
 * @param props Object of HTMLSelect reference and an array of options
 */
export function Dropdown(props: IDropdownProps) {
  const { options, reference, labeledAs } = props;

  return (
    <>
      {labeledAs ? <label htmlFor={labeledAs.elementId}>{labeledAs.text}</label> : ""}
      <select ref={reference}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
