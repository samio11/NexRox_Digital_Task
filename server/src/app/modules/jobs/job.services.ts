import { AppError } from "../../errors/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { IJob } from "./jobs.interface";
import { Jobs } from "./jobs.model";

const createJob = async (payload: IJob) => {
  console.log(payload);
  const result = await Jobs.create(payload);
  return result;
};
const getAllJob = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Jobs.find(), query)
    .filter()
    .search(["title", "jobType", "level"])
    .sort()
    .paginate()
    .fields();
  const result = await queryBuilder.builder().populate("user", "-password");
  return result;
};

const deleteAJob = async (id: string, userId: string) => {
  const selectedJob = await Jobs.findById(id);

  if (!selectedJob) {
    throw new AppError(404, "Job not found...");
  }

  if (userId !== selectedJob.user.toString()) {
    throw new AppError(401, "Access Denied to Delete");
  }
  const result = await Jobs.findByIdAndDelete(id);
  return result;
};
const updateAJob = async (
  id: string,
  payload: Partial<IJob>,
  userId: string
) => {
  const selectedJob = await Jobs.findById(id);

  if (!selectedJob) {
    throw new AppError(404, "Job not found...");
  }

  if (userId !== selectedJob.user.toString()) {
    throw new AppError(401, "Access Denied to Update");
  }
  const result = await Jobs.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const jobServices = { createJob, getAllJob, deleteAJob, updateAJob };
