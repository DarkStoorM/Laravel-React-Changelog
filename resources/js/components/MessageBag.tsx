import React from "react";
import { TMessageBagStatus } from "../utils/types/TMessageBagStatus";

interface mess {
  status?: TMessageBagStatus;
  messages: string[];
}

export function MessageBag({ status, messages }: mess) {
  return (
    <div className={`message-bag ${status}`}>
      {messages.map((message) => (
        <div>{message}</div>
      ))}
    </div>
  );
}
