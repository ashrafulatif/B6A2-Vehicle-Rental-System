import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { bookingController } from "./booking.controller";

const router = Router();

router.post(
  "/",
  authMiddleware("admin", "customer"),
  bookingController.createBooking
);

router.get(
  "/",
  authMiddleware("admin", "customer"),
  bookingController.getAllBookings
);

router.put(
  "/:bookingId",
  authMiddleware("admin", "customer"),
  bookingController.updateBooking
);

export const bookingsRouter = router;
