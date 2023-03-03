export interface IDropdownProps {
  /**
   * Array of Select Options, which will be used both as Value and Option Label
   */
  options: string[];
  /**
   * Internal Select reference
   */
  reference: React.RefObject<HTMLSelectElement>;
}
