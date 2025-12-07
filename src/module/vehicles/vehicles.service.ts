import { pool } from "../../config/db";

const createVehicles = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO Vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result;
};

const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM Vehicles`);

  return result;
};

const getVehiclesbyID = async (id: string) => {
  const result = await pool.query(`SELECT * FROM Vehicles WHERE id = $1`, [id]);

  return result;
};

const updateVehiclesInfo = async (
  payload: Record<string, unknown>,
  id: string
) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  //get exist vehivle
  const getExistingVehicle = await pool.query(
    `SELECT * FROM Vehicles WHERE id = $1`,
    [id]
  );

  const existData = getExistingVehicle.rows[0];

  const result = await pool.query(
    `UPDATE Vehicles SET vehicle_name = $2, type = $3, registration_number = $4, daily_rent_price = $5, availability_status = $6 WHERE id = $1 RETURNING *`,
    [
      id,
      vehicle_name ?? existData.vehicle_name,
      type ?? existData.type,
      registration_number ?? existData.registration_number,
      daily_rent_price ?? existData.daily_rent_price,
      availability_status ?? existData.availability_status,
    ]
  );

  return result;
};

const deleteVehicles = async (id: string) => {
  const result = pool.query(`DELETE FROM Vehicles WHERE id = $1`, [id]);

  return result;
};

export const vehiclesService = {
  createVehicles,
  getAllVehicles,
  getVehiclesbyID,
  updateVehiclesInfo,
  deleteVehicles,
};
