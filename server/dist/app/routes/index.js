"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const jobs_routes_1 = require("../modules/jobs/jobs.routes");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        element: auth_routes_1.authRoutes,
    },
    {
        path: "/jobs",
        element: jobs_routes_1.jobsRoutes,
    },
];
moduleRoutes.forEach((x) => exports.router.use(x.path, x.element));
