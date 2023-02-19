import ReactDOM from "react-dom";
import { selectElementIfExists } from "./ElementSelector";

/**
 * Renders the given React Component if the element with specified ID exists in the DOM
 *
 * @param {JSX.Element}   component React Component to eventually render
 * @param {string}        elementId DOM Element id
 */
export function renderIfExists(component: JSX.Element, elementId: string): void {
  const [exists, element] = selectElementIfExists(elementId);

  if (exists) {
    ReactDOM.render(component, element);
  }
}
