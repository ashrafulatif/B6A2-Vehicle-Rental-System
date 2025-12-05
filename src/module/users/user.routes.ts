import { Router } from "express";

const router = Router();

router.get("/");

router.post("/");

router.put("/:userId");

router.delete("/:userId");

export const userRouter = router;
