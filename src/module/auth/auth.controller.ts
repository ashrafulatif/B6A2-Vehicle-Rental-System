import { Request, Response } from "express";
import { authServices } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.registerUser(req.body);

    //remove pass
    const { password, ...validResponse } = result.rows[0];

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: validResponse,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authServices.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  registerUser,
  loginUser,
};
