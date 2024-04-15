import express from "express";
import AuthController from "./auth.controller.js";

import { loginUserDto } from "./dto/loginUser.dto.js";
import { registerUserDto } from "./dto/registerUser.dto.js";

export const AuthRouter = express.Router();

// register user
AuthRouter.post("/register", registerUserDto, AuthController.registerUser);

// login user
AuthRouter.post("/login", loginUserDto, AuthController.loginUser);
