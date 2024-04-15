import bcypt from "bcrypt";

export async function hashPassowrd(passowrd) {
  const hashedPassword = await bcypt.hash(passowrd, 10);
  return hashedPassword;
}

export async function comparePasswords(password, hashedPassword) {
  const isMatch = await bcypt.compare(password, hashedPassword);
  return isMatch;
}
