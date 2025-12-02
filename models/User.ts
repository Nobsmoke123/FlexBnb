import { Schema, model, models, Types, Model } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  email: string;
  username: string;
  image: string;
  bookmarks: Types.ObjectId[];
  createdAt: string;
  updatedAt: string;
}

const userSchema = new Schema<User, Model<User>>(
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

const UserModel =
  (models.User as Model<User>) || model<User>("User", userSchema);

export default UserModel;
