/**
 * Alias of `getElementById` with null check
 *
 * @param   {string}       id  HTML DOM element id
 *
 * @template ElementType Generic Element, that inherits from HTMLElement, e.g. HTMLDivElement
 */
export function selectElementIfExists<ElementType extends HTMLElement>(
  id: string
): [boolean, ElementType] {
  const element = document.getElementById(id);

  return [element !== null, element as ElementType];
}
