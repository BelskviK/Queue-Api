import Shop from "../modules/Shop/shop.model.js";

//asssigne queue to shop
export const assigneQueueToShop = async function (doc, next) {
  const shop = await Shop.findById(doc.shop);
  if (!shop) {
    throw new Error("Shop not found");
  }
  shop.queues.push(doc._id);
  await shop.save();
  next();
};

// unassign queueId from shop
export const unAssigneQueueFromShop = async function (queue) {
  try {
    const shop = await Shop.findById(queue.shop);
    if (!shop) {
      throw new Error("Shop not found");
    }
    await shop.updateOne({ $pull: { queues: queue._id } });
    await shop.save();
  } catch (error) {
    next(error);
  }
};
