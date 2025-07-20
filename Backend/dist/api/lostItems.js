"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lostRouter = void 0;
var express_1 = __importDefault(require("express"));
var lostItems_1 = require("../application/lostItems");
var utils_1 = require("../utils");
var authentication_middleware_1 = require("./middleware/authentication-middleware");
exports.lostRouter = express_1.default.Router();
exports.lostRouter
    .route('/')
    /*.post(asyncHandler(async (req, res, next) => {
        await isAuthonticated(req, res, next);
        await createLostReport(req, res, next);
    }))*/
    .post(((0, utils_1.asyncHandler)(lostItems_1.createLostReport)))
    .get((0, utils_1.asyncHandler)(lostItems_1.geTLostReport));
exports.lostRouter
    .route('/:id')
    .get(((0, utils_1.asyncHandler)(lostItems_1.getLostReportById)))
    .patch(authentication_middleware_1.isAuthonticated, ((0, utils_1.asyncHandler)(lostItems_1.UpdateReport)))
    .delete(authentication_middleware_1.isAuthonticated, ((0, utils_1.asyncHandler)(lostItems_1.deleteLostReport)))
    .get(authentication_middleware_1.isAuthonticated, ((0, utils_1.asyncHandler)(lostItems_1.getLostProductByCategory)));
//# sourceMappingURL=lostItems.js.map