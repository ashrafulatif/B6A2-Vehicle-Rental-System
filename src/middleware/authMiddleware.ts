import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const authMiddleware = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(400).json({
          message: "Bad request. token not found",
        });
      }

      //decode token
      const decodeToken = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;

      //set user into req
      req.user = decodeToken;

      if (roles.length && !roles.includes(decodeToken.role)) {
        return res.status(401).json({
          success: false,
          message: "unauthorized!",
        });
      }

      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default authMiddleware;
