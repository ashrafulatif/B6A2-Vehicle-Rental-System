import { Request, Response } from "express";

const createVehicles = async (req: Request, res: Response) => {};

const getAllVehicles = async (req: Request, res: Response) => {};

const getVehiclesbyID = async (req: Request, res: Response) => {};

const updateVehiclesInfo = async (req: Request, res: Response) => {};

const deleteVehicles = async (req: Request, res: Response) => {};

export const vehiclesController = {
  createVehicles,
  getAllVehicles,
  getVehiclesbyID,
  updateVehiclesInfo,
  deleteVehicles,
};
