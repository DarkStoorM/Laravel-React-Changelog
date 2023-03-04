import React from "react";
import { IMessageBagProps } from "resources/js/utils/interfaces/IMessageBagProps";

/**
 * Displays a result message container, having its `background-color` controlled by `status` prop
 */
export function MessageBag({ status, messages }: IMessageBagProps) {
  return (
    <div id="message-bag" className={`message-bag ${status}`}>
      {messages.map((message) => (
        <div>{message}</div>
      ))}
    </div>
  );
}
