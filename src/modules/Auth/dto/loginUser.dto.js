import { body } from "express-validator";

export const loginUserDto = [
  body("username")
    .notEmpty()
    .withMessage("არ უნდა იყოს ცარიელი")
    .isLength({ min: 6 })
    .withMessage("მინიმუმ 6 სიმბოლო"),
  body("password")
    .notEmpty()
    .withMessage("არ უნდა იყოს ცარიელი")
    .isLength({ min: 8 })
    .withMessage("მინიმუმ 8 სიმბოლო"),
];
