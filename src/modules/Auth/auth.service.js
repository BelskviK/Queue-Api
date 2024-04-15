import User from "../User/user.model.js";
import { hashPassowrd } from "../../utils/bcypt.utils.js";
import { comparePasswords } from "../../utils/bcypt.utils.js";
import { createAccessToken } from "../../utils/jwt-tokens.js";

export async function registerUser(body) {
  const hashedPassword = await hashPassowrd(body.password);
  const user = new User({
    username: body.username,
    password: hashedPassword,
    email: body.email,
  });

  if (body.role) {
    user.role = body.role;
  }
  await user.save();
  return user;
}

export async function loginUser(body) {
  const { username, password } = body;

  const user = await User.findOne({ username: { $eq: username } });

  if (!user) {
    throw new Error("invalid login credetials");
  }

  const isPasswordValid = await comparePasswords(password, user.password);

  if (!isPasswordValid) {
    throw new Error("invalid login credetials");
  }

  const accessToken = createAccessToken({
    userId: user._id,
    role: user.role,
    username: user.username,
  });

  return { accessToken };
}
