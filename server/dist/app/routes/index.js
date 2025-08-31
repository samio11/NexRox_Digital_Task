"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        element: auth_routes_1.authRoutes,
    },
];
moduleRoutes.forEach((x) => exports.router.use(x.path, x.element));
