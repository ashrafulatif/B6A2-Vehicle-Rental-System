import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRouter } from "./module/auth/auth.routes";
import { userRouter } from "./module/users/user.routes";
import { vehiclesRouter } from "./module/vehicles/vehicles.routes";
import { bookingsRouter } from "./module/bookings/bookings.routes";
const app = express();

app.use(express.json());

initDB();

//root
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Vehicle Rental System API ",
    endpoints: {
      auth: "/api/v1/auth",
      users: "/api/v1/users",
      vehicles: "/api/v1/vehicles",
      bookings: "/api/v1/bookings",
    },
  });
});

//auth
app.use("/api/v1/auth", authRouter);
//user
app.use("/api/v1/users", userRouter);
// //vehicles
app.use("/api/v1/vehicles", vehiclesRouter);
// // bookings
app.use("/api/v1/bookings", bookingsRouter);

export default app;
