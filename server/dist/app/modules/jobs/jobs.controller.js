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
exports.jobController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const job_services_1 = require("./job.services");
const createAJob = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield job_services_1.jobServices.createJob(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Job is created",
        statusCode: 201,
        data: result,
    });
}));
const getAllJob = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req === null || req === void 0 ? void 0 : req.query;
    const result = yield job_services_1.jobServices.getAllJob(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Jobs Data is Getted",
        statusCode: 200,
        data: result,
    });
}));
const deleteAJob = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    const { userId } = req === null || req === void 0 ? void 0 : req.user;
    const result = yield job_services_1.jobServices.deleteAJob(id, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Job Data is Deleted",
        statusCode: 200,
        data: "",
    });
}));
const updateAJob = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    const payload = req === null || req === void 0 ? void 0 : req.body;
    const { userId } = req === null || req === void 0 ? void 0 : req.user;
    const result = yield job_services_1.jobServices.updateAJob(id, payload, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Job Data is Updated",
        statusCode: 200,
        data: result,
    });
}));
exports.jobController = { createAJob, getAllJob, deleteAJob, updateAJob };
