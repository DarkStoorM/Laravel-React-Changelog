import React from "react";
import { EMessageBagStatus } from "../utils/enums/EMessageBagStatus";

interface mess {
  status?: EMessageBagStatus;
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
