"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRounter = void 0;
var express_1 = __importDefault(require("express"));
var categories_1 = require("../application/categories");
var utils_1 = require("../utils");
exports.categoryRounter = express_1.default.Router();
exports.categoryRounter.route('/').post((0, utils_1.asyncHandler)(categories_1.createCaregory)).get((0, utils_1.asyncHandler)(categories_1.getCategories));
exports.categoryRounter.route('/:id').delete((0, utils_1.asyncHandler)(categories_1.deleteCategory)).patch((0, utils_1.asyncHandler)(categories_1.updateCategory));
//# sourceMappingURL=category.js.map