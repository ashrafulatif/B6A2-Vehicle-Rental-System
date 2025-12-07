import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { bookingController } from "./booking.controller";
import { Roles } from "../auth/auth.constant";

const router = Router();

router.post(
  "/",
  authMiddleware(Roles.admin, Roles.customer),
  bookingController.createBooking
);

router.get(
  "/",
  authMiddleware(Roles.admin, Roles.customer),
  bookingController.getAllBookings
);

router.put(
  "/:bookingId",
  authMiddleware(Roles.admin, Roles.customer),
  bookingController.updateBooking
);

export const bookingsRouter = router;
