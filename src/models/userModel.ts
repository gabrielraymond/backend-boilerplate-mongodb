import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  gender: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    address: {
      type: String,
      min: 11,
    },
    phoneNumber: {
      type: String,
    },
    gender: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //This option automatically adds createdAt and updatedAt fields
);

const User = model<IUser>("User", userSchema);
export default User;
