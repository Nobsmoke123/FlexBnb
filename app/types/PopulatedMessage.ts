import type { Message } from "@/models/Messages";
import type { Property } from "@/models/Property";
import type { User } from "next-auth";

export interface PopulatedMessage
  extends Omit<Message, "sender" | "receiver" | "property"> {
  sender: User;
  receiver: User;
  property: Property;
}
