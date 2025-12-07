import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    //get user id and role
    const userId = req.user?.id;
    const userRole = req.user?.role;

    const result = await bookingService.getAllBookings(userId, userRole);

    const message =
      userRole === "admin"
        ? "Bookings retrieved successfully"
        : "Your bookings retrieved successfully";

    res.status(200).json({
      success: true,
      message,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const userRole = req.user?.role;
    const userId = req.user?.id;
    const { status } = req.body;

    const result = await bookingService.updateBooking(
      userRole,
      userId,
      status,
      req.params.bookingId as string
    );

    res.status(200).json({
      success: true,
      message: result?.message,
      data: result?.booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBookings,
  updateBooking,
};
