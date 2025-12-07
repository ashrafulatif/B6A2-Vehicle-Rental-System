import { pool } from "../../config/db";

const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM Users`
  );

  return result;
};

const updateUser = async (
  id: string,
  loggedId: number,
  userRole: string,
  name?: string,
  email?: string,
  phone?: string,
  role?: string
) => {
  if (userRole === "customer" && parseInt(id) !== loggedId) {
    throw new Error("Unauthorized. You can only update your own profile");
  }

  const getExistingUser = await pool.query(
    `SELECT name, email, phone, role FROM Users WHERE id = $1`,
    [id]
  );

  const user = getExistingUser.rows[0];

  //modify val
  const finalName = name ?? user.name;
  const finalEmail = email ?? user.email;
  const finalPhone = phone ?? user.phone;
  const finalRole = role ?? user.role;

  const result = await pool.query(
    `UPDATE Users SET name = $2, email = $3, phone = $4, role = $5 WHERE id = $1 RETURNING id, name, email, phone, role`,
    [id, finalName, finalEmail, finalPhone, finalRole]
  );

  return result;
};

const deleteUser = async (id: string) => {
  // Check active bookings
  const activeBookingsCheck = await pool.query(
    `SELECT id FROM Bookings WHERE customer_id = $1 AND status = $2`,
    [id, "active"]
  );

  if (activeBookingsCheck.rows.length > 0) {
    throw new Error("Cannot delete user with active bookings");
  }

  const result = await pool.query(`DELETE FROM Users WHERE id = $1`, [id]);

  return result;
};

export const userService = {
  getAllUsers,
  updateUser,
  deleteUser,
};
