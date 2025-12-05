import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  db_connection_string: process.env.DB_CONNECTION,
};

export default config;
