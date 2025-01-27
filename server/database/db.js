import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Db connected");
  } catch (e) {
    console.log("Error in db connection", e);
  }
};
