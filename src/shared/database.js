import mongoose from "mongoose";

export async function connectToMongoDB() {
  try {
    mongoose.connect(
      "mongodb+srv://root:root@jobebi.pijgp8i.mongodb.net/?retryWrites=true&w=majority&appName=Jobebi"
    );
    console.log("Conected To MongoDB");
  } catch (error) {
    console.log("Error While Connection to MongoDB");
    console.log(error);
  }
}
