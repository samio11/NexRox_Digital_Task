import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    element: authRoutes,
  },
];

moduleRoutes.forEach((x) => router.use(x.path, x.element));
