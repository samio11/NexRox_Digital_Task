import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { jobServices } from "./job.services";

const createAJob = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await jobServices.createJob(payload);
  sendResponse(res, {
    success: true,
    message: "Job is created",
    statusCode: 201,
    data: result,
  });
});
const getAllJob = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await jobServices.getAllJob(query as Record<string, string>);
  sendResponse(res, {
    success: true,
    message: "Jobs Data is Getted",
    statusCode: 200,
    data: result,
  });
});
const deleteAJob = catchAsync(async (req, res, next) => {
  const { id } = req?.params;
  const { userId } = req?.user as JwtPayload;
  const result = await jobServices.deleteAJob(id, userId);
  sendResponse(res, {
    success: true,
    message: "Job Data is Deleted",
    statusCode: 200,
    data: "",
  });
});
const updateAJob = catchAsync(async (req, res, next) => {
  const { id } = req?.params;
  const payload = req?.body;
  const { userId } = req?.user as JwtPayload;
  const result = await jobServices.updateAJob(id, payload, userId);
  sendResponse(res, {
    success: true,
    message: "Job Data is Updated",
    statusCode: 200,
    data: result,
  });
});

export const jobController = { createAJob, getAllJob, deleteAJob, updateAJob };
