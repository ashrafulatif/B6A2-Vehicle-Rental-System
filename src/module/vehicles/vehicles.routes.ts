import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { vehiclesController } from "./vehicles.controller";

const router = Router();

router.post("/", authMiddleware("admin"), vehiclesController.createVehicles);

router.get("/", vehiclesController.getAllVehicles);

router.get("/:vehicleId", vehiclesController.getVehiclesbyID);

router.put(
  "/:vehicleId",
  authMiddleware("admin"),
  vehiclesController.updateVehiclesInfo
);

router.delete(
  "/:vehicleId",
  authMiddleware("admin"),
  vehiclesController.deleteVehicles
);

export const vehiclesRouter = router;
