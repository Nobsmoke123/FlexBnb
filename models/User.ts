import { Schema, model, Types } from "mongoose";

export interface IUser {
  email: string;
  username: string;
  image: string;
  bookmarks: Types.ObjectId[];
  createdAt: string;
  updatedAt: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: [true, "Email already exists."],
      required: [true, "Email is required."],
    },

    username: {
      type: String,
      required: [true, "Username is required."],
      unique: [true, "Username is already taken."],
    },

    image: {
      type: String,
    },

    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
