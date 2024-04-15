import { validationResult } from "express-validator";
import { registerUser, loginUser } from "./auth.service.js";

class AuthController {
  async registerUser(req, res) {
    try {
      const newUser = await registerUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async loginUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const result = await loginUser(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new AuthController();
