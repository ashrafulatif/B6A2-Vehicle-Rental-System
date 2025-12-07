import { pool } from "../../config/db";
import { bookingHelper } from "../../helpers/bookingHelper";
import { formatResponse } from "../../helpers/formatResponse";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  //find vehicle by id
  const findVehicle = await pool.query(`SELECT * FROM Vehicles WHERE id = $1`, [
    vehicle_id,
  ]);

  const vehicleData = findVehicle.rows[0];
  const { daily_rent_price, vehicle_name, availability_status } = vehicleData;

  if (!vehicleData) {
    throw new Error("Vehicle id not found");
  }
  if (availability_status === "booked") {
    throw new Error("Vehicle id not available");
  }
  //bookin days
  const duration = bookingHelper.calculateDays(
    rent_start_date as string,
    rent_end_date as string
  );

  if (duration <= 0) {
    throw new Error("End date must be after start date");
  }

  const totalPrice = daily_rent_price * duration;

  //isert booking
  const result = await pool.query(
    `INSERT INTO Bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice,
      "active",
    ]
  );

  //update vehicle availability
  await pool.query(
    `UPDATE Vehicles SET availability_status = $2 WHERE id = $1`,
    [vehicle_id, "booked"]
  );

  return {
    ...result.rows[0],
    vehicles: {
      vehicle_name,
      daily_rent_price,
    },
  };
};

const getAllBookings = async (userId: number, userRole: string) => {
  //auto update bookin
  await autoUpdateExpiredBookings();

  if (userRole === "admin") {
    const result = await pool.query(`SELECT 
        b.*,
        u.name,
        u.email,
        v.vehicle_name,
        v.registration_number
        FROM Bookings b
        JOIN Users u ON b.customer_id = u.id
        JOIN Vehicles v ON b.vehicle_id = v.id
        `);

    const formatedResult = formatResponse.formatAdminResult(result);

    return formatedResult;
  } else {
    const result = await pool.query(
      `SELECT
        b.id,
        b.vehicle_id,
        b.rent_start_date,
        b.rent_end_date,
        b.total_price,
        b.status,
        v.vehicle_name,
        v.registration_number,
        v.type
        FROM Bookings b
        JOIN Vehicles v ON b.vehicle_id = v.id
        WHERE b.customer_id = $1
        `,
      [userId]
    );

    const formatedResult = formatResponse.formatCustomerResult(result);

    return formatedResult;
  }
};

const updateBooking = async (
  userRole: string,
  userId: number,
  status: string,
  bookingId: string
) => {
  //auto update expire booking
  const count = await autoUpdateExpiredBookings();
  console.log(`${count} bookings were updated`);

  const bookingResult = await pool.query(
    `SELECT * FROM Bookings WHERE id = $1`,
    [bookingId]
  );

  const booking = bookingResult.rows[0];

  if (!booking) {
    throw new Error("Booking not found");
  }
  //customer
  if (userRole === "customer" && status === "cancelled") {
    if (booking.customer_id !== userId) {
      throw new Error("Unauthorized to cancel this booking ");
    }

    //check before start date
    const currentDate = new Date();
    const startDate = new Date(booking.startDate);

    if (currentDate >= startDate) {
      throw new Error("Cannot cancel booking after start date");
    }

    //update booking
    const result = await pool.query(
      `UPDATE Bookings SET status = $1 WHERE id = $2 RETURNING *`,
      [status, bookingId]
    );

    //update vehicle available
    await pool.query(
      `UPDATE Vehicles SET availability_status = $1 WHERE id = $2`,
      ["available", booking.vehicle_id]
    );

    return {
      booking: result.rows[0],
      message: "Booking cancelled successfully",
    };
  }
  //for admin and returnd
  if (userRole === "admin" && status === "returned") {
    const result = await pool.query(
      `UPDATE Bookings SET status = $1 WHERE id = $2 RETURNING *`,
      [status, bookingId]
    );

    //update vehicle available
    await pool.query(
      `UPDATE Vehicles SET availability_status = $1 WHERE id = $2`,
      ["available", booking.vehicle_id]
    );

    //get status
    const getVehicleStatus = await pool.query(
      `SELECT availability_status FROM Vehicles WHERE id =$1`,
      [booking.vehicle_id]
    );

    const curVehicleStatus = getVehicleStatus.rows[0].availability_status;

    return {
      booking: {
        ...result.rows[0],
        vehicles: {
          availability_status: curVehicleStatus,
        },
      },
      message: "Booking marked as returned. Vehicle is now available",
    };
  }
  throw new Error("Unauthorized action. Not allowed to perform this action");
};

//auto update func
const autoUpdateExpiredBookings = async () => {
  const currentDate = new Date().toISOString().split("T")[0];

  const result = await pool.query(
    `UPDATE Bookings
    SET status = $1
    WHERE status = $2
    AND rent_end_date < $3
    RETURNING id, vehicle_id
    `,
    ["returned", "active", currentDate]
  );

  //update vhehile status
  for (const booking of result.rows) {
    await pool.query(
      `UPDATE Vehicles SET availability_status = $1 WHERE id = $2`,
      ["available", booking.vehicle_id]
    );
  }

  return result.rows.length;
};

export const bookingService = {
  createBooking,
  getAllBookings,
  updateBooking,
};
