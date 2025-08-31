import { Router } from "express";
import { authController } from "./auth.controller";

const routes = Router();

routes.post("/register", authController.registerUser);
routes.post("/login", authController.loginUser);
routes.post("/logout", authController.logout);

export const authRoutes = routes;
