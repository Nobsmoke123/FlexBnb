import { Types, Schema, Model, models, model } from "mongoose";

export interface Message {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  property: Types.ObjectId;
  read: boolean;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const messageSchema = new Schema<Message, Model<Message>>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender ID is required."],
    },

    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Receiver ID is required."],
    },

    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property ID is required."],
    },

    read: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      required: [true, "Name is required."],
    },

    email: {
      type: String,
      required: [true, "Email is required."],
    },

    phone: {
      type: String,
      required: [true, "Phone is required."],
    },

    message: {
      type: String,
      required: [true, "Message is required."],
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel =
  (models.Message as Model<Message>) ||
  model<Message>("Message", messageSchema);

export default MessageModel;
