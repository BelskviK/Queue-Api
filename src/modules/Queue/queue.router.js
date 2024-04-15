import express from "express";
import QueueController from "./queue.controller.js";

import { checkAuth } from "../../middlewares/auth.middleware.js";
// import { validate } from "../../middlewares/validation.middleware.js";

export const QueueRouter = express.Router();

//user enters queue
QueueRouter.post("/", checkAuth(["user"]), QueueController.createQueue);

//user leaves queue
QueueRouter.delete(
  "/:queueId",
  checkAuth(["user"]),
  QueueController.deleteQueue
);

// get user queueu remaining in shop
QueueRouter.get(
  "/:shopId/remaining",
  checkAuth(["user"]),
  QueueController.positionInQueue
);

// free first positioned user from queue
QueueRouter.put(
  "/:shopId",
  checkAuth(["owner"]),
  QueueController.freePositionInQueue
);

// count QueueUsers remaining for shop
QueueRouter.get(
  "/:shopId/remaining/count",
  checkAuth(["owner"]),
  QueueController.countRemainingInQueue
);
