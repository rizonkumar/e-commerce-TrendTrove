import mongoose from "mongoose";

// Creating a schema for the user model
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

// Creating a User Model using the prodcut schema
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
