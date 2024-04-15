import {
  createShop,
  deleteShop,
  getShops,
  getShop,
} from "../Shop/shop.service.js";
class ShopController {
  //recruiter creates vacancy
  async createShop(req, res) {
    try {
      const shop = await createShop(req.body.title, req.user.userId);
      res.status(201).json(shop);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  //delete shop
  async deleteShop(req, res) {
    try {
      const deletedShop = await deleteShop(req.params.shopId, req.user.userId);
      res.status(203).json(deletedShop);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //get shops
  async getShops(_, res) {
    try {
      let shops = await getShops();
      res.status(200).json(shops);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // get shop
  async getShop(req, res) {
    try {
      const shop = await getShop(req.params.shopId, req.user.userId);
      res.status(200).json(shop);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export default new ShopController();
