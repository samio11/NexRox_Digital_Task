import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { jobsRoutes } from "../modules/jobs/jobs.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    element: authRoutes,
  },
  {
    path: "/jobs",
    element: jobsRoutes,
  },
];

moduleRoutes.forEach((x) => router.use(x.path, x.element));
