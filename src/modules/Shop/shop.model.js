import mongoose from "mongoose";

export const ShopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    queues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Queue",
      },
    ],
  },
  {
    versionKey: false,
  }
);
export default mongoose.model("Shop", ShopSchema);
