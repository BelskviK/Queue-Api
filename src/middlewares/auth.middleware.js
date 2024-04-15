import jsonwebtoken from "jsonwebtoken";
import { JSON_WEB_TOKEN_SECRET } from "../utils/jwt-tokens.js";

export function checkAuth(requiredRoles = []) {
  return (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")?.[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jsonwebtoken.verify(token, JSON_WEB_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.user = decoded;
      res.user = decoded;

      if (requiredRoles?.length === 0) {
        return next();
      }

      const currentRole = req.user.role;
      if (requiredRoles.includes(currentRole)) {
        next();
      } else {
        return res.status(403).json({ message: "Forbidden" });
      }
    });
  };
}
