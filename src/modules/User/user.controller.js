import { currentUser } from "./user.service.js";

class UserController {
  async getCurrentUser(req, res) {
    try {
      const user = await currentUser(req.user.userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new UserController();
