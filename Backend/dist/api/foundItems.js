"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foundRouter = void 0;
var express_1 = __importDefault(require("express"));
var fountItems_1 = require("../application/fountItems");
var utils_1 = require("../utils");
exports.foundRouter = express_1.default.Router();
exports.foundRouter.route('/').post((0, utils_1.asyncHandler)(fountItems_1.createFoundReport)).get((0, utils_1.asyncHandler)(fountItems_1.getFoundReport));
exports.foundRouter.route('/:id').get((0, utils_1.asyncHandler)(fountItems_1.getFoundReportById)).patch((0, utils_1.asyncHandler)(fountItems_1.updateFoundReport)).delete((0, utils_1.asyncHandler)(fountItems_1.deleteFoundReport));
//# sourceMappingURL=foundItems.js.map