import express from "express";
import ShopController from "./shop.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { checkAuth } from "../../middlewares/auth.middleware.js";

// dtos
import { createShopDto } from "./dto/createShop.dto.js";

export const ShopRouter = express.Router();

// Owner creates Shop
ShopRouter.post(
  "/",
  checkAuth(["owner"]),
  createShopDto,
  validate,
  ShopController.createShop
);

// deleteShop
ShopRouter.delete("/:shopId", checkAuth(["owner"]), ShopController.deleteShop);

//Get all shops
ShopRouter.get("/", ShopController.getShops);

//get shop
ShopRouter.get("/:shopId", checkAuth(["owner"]), ShopController.getShop);
