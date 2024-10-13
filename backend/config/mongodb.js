import mongoose from "mongoose";

const connectDB = async () => {
  console.log("1");
  try {
    console.log("2");
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    console.log("3");
    await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
