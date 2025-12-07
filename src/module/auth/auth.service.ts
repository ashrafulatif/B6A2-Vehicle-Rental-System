import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const registerUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO Users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashedPassword, phone, role]
  );

  return result;
};

const loginUser = async (email: string, password: string) => {
  //find with email
  const result = await pool.query(`SELECT * FROM Users WHERE email = $1`, [
    email,
  ]);

  if (result.rows.length === 0) return null;

  const { password: dbPassword, ...user } = result.rows[0];

  //match pass
  const match = await bcrypt.compare(password, dbPassword);

  if (!match) {
    throw new Error("Invalid Credentials!");
  }
  //gen token

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, config.jwtSecret as string, {
    expiresIn: "5d",
  });

  return {
    token,
    user,
  };
};

export const authServices = {
  registerUser,
  loginUser,
};
