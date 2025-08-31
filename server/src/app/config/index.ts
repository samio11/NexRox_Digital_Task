import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  PORT: process.env.PORT,
  DATABASE: process.env.DATABASE,
  BCRYPT_SALT: process.env.BCRYPT_SALT,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
  NODE_ENV: process.env.NODE_ENV,
};
