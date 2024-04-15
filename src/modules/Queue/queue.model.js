import mongoose from "mongoose";
import { assigneQueueToShop } from "../../middlewares/queue.middleware.js";
export const QueueSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["in-queue", "served", "quited"],
      default: "in-queue", // Default status is "in-queue"
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

//asssigne queue to shop
QueueSchema.post("save", { document: true }, assigneQueueToShop);

export default mongoose.model("Queue", QueueSchema);
