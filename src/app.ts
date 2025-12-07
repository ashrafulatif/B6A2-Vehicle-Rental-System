import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRouter } from "./module/auth/auth.routes";
import { userRouter } from "./module/users/user.routes";
import { vehiclesRouter } from "./module/vehicles/vehicles.routes";
import { bookingsRouter } from "./module/bookings/bookings.routes";
const app = express();

app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Vehicles Rental Systems");
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
