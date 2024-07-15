import crypto from "crypto";

export function hashUserPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedUserPassword = crypto.scryptSync(password, salt, 64);
  return hashedUserPassword.toString("hex") + ":" + salt;
}

export function verifyPassword(storedPassword, suppliedPassword) {
  const [hashedPassword, salt] = storedPassword.split(":");
  const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
  const suppliedPasswordBuf = crypto.scryptSync(suppliedPassword, salt, 64);
  return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}
