"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = require("./infrastructure/db");
require("dotenv/config");
var lostItems_1 = require("./api/lostItems");
var foundItems_1 = require("./api/foundItems");
var category_1 = require("./api/category");
var global_error_handling_middleware_1 = __importDefault(require("./api/middleware/global-error-handling-middleware"));
var cors_1 = __importDefault(require("cors"));
var express_2 = require("@clerk/express");
var dashboard_1 = require("./api/dashboard");
var app = (0, express_1.default)();
var publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY;
var secretKey = process.env.VITE_CLERK_SECRET_KEY;
app.use(express_1.default.json());
app.use((0, express_2.clerkMiddleware)({
    publishableKey: publishableKey,
    secretKey: secretKey
}));
app.use((0, cors_1.default)({
    origin: "http://65.0.99.199",
    credentials: true,
}));
//Pre-middleware
app.use(function (req, res, next) {
    console.log("Request received");
    console.log(req.method, req.url);
    next();
});
app.use('/api/lostitem', lostItems_1.lostRouter);
app.use('/api/founditem', foundItems_1.foundRouter);
app.use('/api/category', category_1.categoryRounter);
app.use('/api/dashboard', dashboard_1.dashboardRouter);
app.use(global_error_handling_middleware_1.default);
(0, db_1.connectDB)();
var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
//# sourceMappingURL=index.js.map