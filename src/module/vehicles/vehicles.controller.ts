import { Request, Response } from "express";
import { vehiclesService } from "./vehicles.service";

const createVehicles = async (req: Request, res: Response) => {
  const result = await vehiclesService.createVehicles(req.body);

  res.status(201).json({
    success: true,
    message: "Vehicle created successfully",
    data: result.rows[0],
  });
  try {
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getAllVehicles();

    if (result.rows.length === 0) {
      res.status(200).json({
        success: false,
        message: "No vehicles found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicles retrieved successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVehiclesbyID = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getVehiclesbyID(
      req.params.vehicleId as string
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Vehicles not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVehiclesInfo = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.updateVehiclesInfo(
      req.body,
      req.params.vehicleId as string
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicles not updated",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.deleteVehicles(
      req.params.vehicleId as string
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicles not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const vehiclesController = {
  createVehicles,
  getAllVehicles,
  getVehiclesbyID,
  updateVehiclesInfo,
  deleteVehicles,
};
