"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobServices = void 0;
const AppError_1 = require("../../errors/AppError");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const jobs_model_1 = require("./jobs.model");
const createJob = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield jobs_model_1.Jobs.create(payload);
    return result;
});
const getAllJob = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(jobs_model_1.Jobs.find(), query)
        .filter()
        .search(["title", "jobType", "level"])
        .sort()
        .paginate()
        .fields();
    const result = yield queryBuilder.builder().populate("user", "-password");
    return result;
});
const deleteAJob = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const selectedJob = yield jobs_model_1.Jobs.findById(id);
    if (!selectedJob) {
        throw new AppError_1.AppError(404, "Job not found...");
    }
    if (userId !== selectedJob.user.toString()) {
        throw new AppError_1.AppError(401, "Access Denied to Delete");
    }
    const result = yield jobs_model_1.Jobs.findByIdAndDelete(id);
    return result;
});
const updateAJob = (id, payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const selectedJob = yield jobs_model_1.Jobs.findById(id);
    if (!selectedJob) {
        throw new AppError_1.AppError(404, "Job not found...");
    }
    if (userId !== selectedJob.user.toString()) {
        throw new AppError_1.AppError(401, "Access Denied to Update");
    }
    const result = yield jobs_model_1.Jobs.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.jobServices = { createJob, getAllJob, deleteAJob, updateAJob };
