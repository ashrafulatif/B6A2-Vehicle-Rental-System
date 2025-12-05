import express, { Request, Response } from "express";
import initDB from "./config/db";
const app = express();

app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Vehicles Rental Systems");
});

//auth
app.use("/api/v1/auth");
//user
app.use("/api/v1/users");
//vehicles
app.use("/api/v1/vehicles");
// bookings
app.use("/api/v1/bookings");
export default app;
