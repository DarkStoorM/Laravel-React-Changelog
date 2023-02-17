/**
 * Alias of `getElementById` with null check
 *
 * @param   {string}       id  HTML DOM element id
 *
 * @throws {Error}
 */
export function selectElement<ElementType extends HTMLElement>(
  id: string
): ElementType {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Element of id: (${element}) was not present in the DOM.`);
  }

  return element as ElementType;
}
