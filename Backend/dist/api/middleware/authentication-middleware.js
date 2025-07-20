"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthonticated = void 0;
var express_1 = require("@clerk/express");
var isAuthonticated = function (req, res, next) {
    if (!(0, express_1.getAuth)(req).userId) {
        throw new Error("User not authenticated");
    }
    next();
};
exports.isAuthonticated = isAuthonticated;
//# sourceMappingURL=authentication-middleware.js.map