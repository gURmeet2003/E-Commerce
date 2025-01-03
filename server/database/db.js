import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTDB);
    console.log("Db connected");
  } catch (e) {
    console.log("Error in db", e);
  }
};

export default dbconnect;
