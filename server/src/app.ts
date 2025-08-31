import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares.ts/globalErrorHandler";
import { notFound } from "./app/middlewares.ts/notFound";
import cookieParser from "cookie-parser";
import { router } from "./app/routes";
const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.status(201).json({
    message: "Server is running successfully",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
