import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { vehiclesController } from "./vehicles.controller";
import { Roles } from "../auth/auth.constant";

const router = Router();

router.post(
  "/",
  authMiddleware(Roles.admin),
  vehiclesController.createVehicles
);

router.get("/", vehiclesController.getAllVehicles);

router.get("/:vehicleId", vehiclesController.getVehiclesbyID);

router.put(
  "/:vehicleId",
  authMiddleware(Roles.admin),
  vehiclesController.updateVehiclesInfo
);

router.delete(
  "/:vehicleId",
  authMiddleware(Roles.admin),
  vehiclesController.deleteVehicles
);

export const vehiclesRouter = router;
