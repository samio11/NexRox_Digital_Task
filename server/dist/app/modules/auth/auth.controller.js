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
exports.authController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const createUserToken_1 = require("../../utils/createUserToken");
const sendResponse_1 = require("../../utils/sendResponse");
const setCookies_1 = require("../../utils/setCookies");
const auth_service_1 = require("./auth.service");
const registerUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield auth_service_1.authServices.registerUser(payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "User Created Done",
        success: true,
        data: result,
    });
}));
const loginUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const loggedInUser = yield auth_service_1.authServices.loginUser(payload);
    const token = (0, createUserToken_1.createUserToken)(loggedInUser);
    (0, setCookies_1.setCookie)(res, token);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "User Logged In Successfully",
        success: true,
        data: {
            accessToken: token.accessToken,
        },
    });
}));
const logout = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "User Logged Out Successfully",
        success: true,
        data: "",
    });
}));
exports.authController = { registerUser, loginUser, logout };
