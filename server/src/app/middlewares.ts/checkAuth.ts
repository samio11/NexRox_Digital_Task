import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { AppError } from "../errors/AppError";

export const checkAuth =
  (...requiredRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.headers?.authorization || req?.cookies?.accessToken;
      if (!token) {
        throw new AppError(401, "Token is not found...");
      }
      const verifiedUser = verifyToken(
        token,
        config.JWT_ACCESS_TOKEN as string
      ) as JwtPayload;
      const existUser = await User.findOne({ email: verifiedUser.email });
      if (!existUser) {
        throw new AppError(401, "User in not found");
      }
      if (!requiredRole.includes(existUser?.role as string)) {
        throw new AppError(401, "Access Denied");
      }
      req.user = verifiedUser;
      next();
    } catch (err) {
      next(err);
    }
  };
