export interface IDropdownProps {
  /**
   * When specified, will cause the Component to render a Label tied to the Select Element
   * under the id in `elementId`
   */
  labeledAs?: { text: string; elementId: string };
  /**
   * Array of Select Options, which will be used both as Value and Option Label
   */
  options: string[];
  /**
   * Internal Select reference
   */
  reference: React.RefObject<HTMLSelectElement>;
}
