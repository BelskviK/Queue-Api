import mongoose from "mongoose";

export async function connectToMongoDB() {
  try {
    mongoose.connect(
      ""
    );
    console.log("Conected To MongoDB");
  } catch (error) {
    console.log("Error While Connection to MongoDB");
    console.log(error);
  }
}
