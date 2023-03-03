/**
 * Message Status later applied as a CSS class to the Message Bag component
 */
export enum EMessageBagStatus {
  /**
   * Applies a Warning CSS class, which fills the container with red color
   */
  WARNING = "message-bag--warning",
  /**
   * Applies a Warning CSS class, which fills the container with green color
   */
  SUCCESS = "message-bag--success",
  /**
   * Omits applying CSS classes, which makes the component transparent.
   *
   * This status is used for `Loading` state, where the component doesn't need a background-color
   */
  EMPTY = "",
}
