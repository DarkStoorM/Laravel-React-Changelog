import { EMessageBagStatus } from "../enums/EMessageBagStatus";

/**
 * Describes the Message bag Component, visually affected by the message status
 */
export interface IMessageBagProps {
  status?: EMessageBagStatus;
  messages: string[];
}
