"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
var express_1 = __importDefault(require("express"));
var utils_1 = require("../utils");
var dashboard_1 = require("../application/dashboard");
exports.dashboardRouter = express_1.default.Router();
exports.dashboardRouter.route('/').get((0, utils_1.asyncHandler)(dashboard_1.getDashboardData));
//# sourceMappingURL=dashboard.js.map