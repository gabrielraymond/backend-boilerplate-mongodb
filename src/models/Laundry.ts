import { Schema, model } from "mongoose";

const laundrySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});


const Laundry = model<any>("Laundry", laundrySchema);
export default Laundry;