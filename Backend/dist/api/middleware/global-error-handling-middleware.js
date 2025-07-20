"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globalErrorHandlingMiddleware = function (error, req, res, next) {
    console.log(error);
    if (error.name === "NotFoundError") {
        return res.status(404).json({
            message: error.message
        }).send();
    }
    else if (error.name === "ValidationError") {
        return res.status(400).json({
            message: error.message
        }).send();
    }
    else {
        res.status(500).json({
            message: "Internal Server Error"
        }).send();
    }
};
exports.default = globalErrorHandlingMiddleware;
//# sourceMappingURL=global-error-handling-middleware.js.map