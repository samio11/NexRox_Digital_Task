import { Router } from "express";
import { checkAuth } from "../../middlewares.ts/checkAuth";
import { jobController } from "./jobs.controller";

const routes = Router();

routes.post("/", checkAuth("USER"), jobController.createAJob);
routes.get("/", checkAuth("USER"), jobController.getAllJob);
routes.delete("/:id", checkAuth("USER"), jobController.deleteAJob);
routes.put("/:id", checkAuth("USER"), jobController.updateAJob);

export const jobsRoutes = routes;
