import Shop from "./shop.model.js";

//create a new shop
export async function createShop(title, owner) {
  const shop = new Shop({ title, owner });
  await shop.save();
  return shop;
}

//delete a shop
export async function deleteShop(shopId, owner) {
  const shop = await Shop.findOne({
    _id: { $eq: shopId },
    owner: { $eq: owner },
  });
  if (!shop) {
    throw new Error("Shop not found");
  }
  await shop.deleteOne();
  return shop;
}

//get all shop
export async function getShops(owner) {
  const shop = await Shop.find();
  if (!shop) {
    throw new Error("Shop not found");
  }

  return shop;
}

//get my shop
export async function getShop(shopId, owner) {
  const shop = await Shop.findOne({
    _id: { $eq: shopId },
    owner: { $eq: owner },
  });
  if (!shop) {
    throw new Error("Shop not found");
  }
  return shop;
}
