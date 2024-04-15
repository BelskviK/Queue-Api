import Queue from "./queue.model.js";
import Shop from "../Shop/shop.model.js";
import { unAssigneQueueFromShop } from "../../middlewares/queue.middleware.js";

// User enters queue in shop
export async function createQueue(shop, user) {
  const existingQueue = await Queue.findOne({ shop, user, status: "in-queue" });

  if (existingQueue) {
    throw new Error("User is already queued in this shop");
  }

  const queue = new Queue({ shop, user, status: "in-queue" });
  await queue.save();
  return queue;
}

//user quites queue in shop
export async function deleteQueue(queueId, userId) {
  const queue = await Queue.findById(queueId);
  const user = queue.user.toString();
  if (userId === user) {
    queue.status = "quited";
    await queue.save();

    //unassigne queueId from shop
    unAssigneQueueFromShop(queue);
    return queue;
  } else {
    throw new Error("Forbiden");
  }
}

// Get user queue position in shop
export async function getPositionInQueue(shopId, userId) {
  const shop = await Shop.findOne({ _id: shopId });
  if (!shop) {
    throw new Error("Shop not found");
  }

  const shopQueues = shop.queues;
  for (let i = 0; i < shopQueues.length; i++) {
    const queueId = shopQueues[i];
    const queueData = await Queue.findById(queueId);
    const user = queueData.user.toString();

    if (user === userId) {
      return i + 1;
    }
  }
  throw new Error("User not found in the queue");
}

// Free first positioned user from queue, with owner validation and queue sorting
export async function freePositionInQueue(shopId, userId) {
  const shop = await Shop.findOne({ _id: shopId });
  if (!shop) {
    throw new Error("Shop not found");
  }
  if (shop.owner.toString() !== userId) {
    throw new Error(
      "Only the owner of the shop can free the first positioned user from the queue"
    );
  }

  shop.queues.sort((a, b) => a.createdAt - b.createdAt);

  const shopQueues = shop.queues;
  if (shopQueues.length === 0) {
    throw new Error("There are no queues in the shop");
  }

  const firstQueueId = shopQueues[0];
  const firstQueue = await Queue.findById(firstQueueId);

  if (!firstQueue) {
    throw new Error("No user in queue");
  }

  firstQueue.status = "served";
  await firstQueue.save();

  shopQueues.shift();
  await shop.save();
  return firstQueue.user.toString();
}

export async function countRemainingInQueue(shopId) {
  const shop = await Shop.findOne({ _id: shopId });
  if (!shop) {
    throw new Error("Shop not found");
  }

  // Find all queues belonging to the shop with status "in-queue"
  const remainingQueuesCount = await Queue.countDocuments({
    shop: shopId,
    status: "in-queue",
  });

  // Return the count of remaining queues
  return remainingQueuesCount;
}
