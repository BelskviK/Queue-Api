import { body } from "express-validator";

export const createShopDto = [body("title").notEmpty().isString()];
