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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLostProductByCategory = exports.UpdateReport = exports.deleteLostReport = exports.getLostReportById = exports.geTLostReport = exports.createLostReport = void 0;
var LostReport_1 = __importDefault(require("../infrastructure/schemas/LostReport"));
var not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
var utils_1 = require("../utils");
var createLostReport = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var report, message, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, LostReport_1.default.create(req.body)];
            case 1:
                report = _a.sent();
                if (!report) return [3 /*break*/, 6];
                if (!req.body.email) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, utils_1.sendConfirmationEmail)(report.email, report, 'LOST')];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!req.body.phoneNo) return [3 /*break*/, 5];
                message = "Hello ".concat(report.name, ", your lost item report (Ref: ").concat(report.referanceNo, ") has been created successfully. Thank you!");
                return [4 /*yield*/, (0, utils_1.sendSMS)(req.body.phoneNo, message)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/, res.status(201).json({ message: "You have successfully created a report" })];
            case 6: return [2 /*return*/, res.status(200).json({ message: 'Something went wrong try again' })];
            case 7:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.createLostReport = createLostReport;
var geTLostReport = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, referance, category, location, policeStation, district, date, status, _b, limit, _c, offset, query, totalCount, reports, err_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                _a = req.query, referance = _a.referance, category = _a.category, location = _a.location, policeStation = _a.policeStation, district = _a.district, date = _a.date, status = _a.status, _b = _a.limit, limit = _b === void 0 ? '10' : _b, _c = _a.offset, offset = _c === void 0 ? '0' : _c;
                query = {};
                if (referance)
                    query.referanceNo = { $regex: referance, $options: 'i' };
                if (category)
                    query.category = { $in: [category] };
                if (location)
                    query.location = { $regex: location, $options: 'i' };
                if (policeStation)
                    query.nearestPoliceStation = { $regex: policeStation, $options: 'i' };
                if (district)
                    query.district = { $regex: district, $options: 'i' };
                // --- AUTHENTICATION AND ROLE-BASED ACCESS LOGIC ---
                // const { userId, sessionClaims } = getAuth(req);
                // const role = sessionClaims?.metadata?.role ?? "public"; // Default to "public" if no role metadata
                // console.log("------------------- Backend Debugging Start -------------------");
                // console.log("Incoming Query Params:", req.query);
                // console.log("Authenticated User ID:", userId); // Log the actual userId from Clerk
                // console.log("User Role (from Clerk claims):", role);
                // if (role !== 'admin') {
                //     // If the user is NOT an admin, they can ONLY see their own reports.
                //     // This also handles unauthenticated users (userId will be null).
                //     // A non-existent userId will result in 0 matches, which is desired for unauthenticated.
                //     if (userId) { // Ensure there's an actual userId to filter by
                //         query.createBy = userId;
                //         console.log("Applying non-admin user filter: query.createBy =", userId);
                //     } else {
                //         // If not an admin AND not authenticated, return no data (or handle differently)
                //         console.log("Not an admin and not authenticated. Returning no data.");
                //         return res.status(200).json({ totalCount: 0, data: [] });
                //     }
                // } else {
                //     // If role IS 'admin', no 'createBy' filter is applied. Admins see all.
                //     console.log("Admin user detected. No 'createBy' filter applied.");
                // }
                // console.log("Final Mongoose Query Object:", JSON.stringify(query, null, 2));
                // console.log("Limit:", limit, "Offset:", offset);
                if (date && typeof date === 'string') {
                    query.dateOfLost = new Date(date);
                }
                if (status)
                    query.status = { $regex: status, $options: 'i' };
                console.log("Final Query:", query);
                return [4 /*yield*/, LostReport_1.default.countDocuments(query)];
            case 1:
                totalCount = _d.sent();
                return [4 /*yield*/, LostReport_1.default.find(query)
                        .limit(parseInt(limit))
                        .skip(parseInt(offset))
                        .populate('category')
                        .sort({ updatedAt: -1 })];
            case 2:
                reports = _d.sent();
                console.log("Reports:", reports);
                return [2 /*return*/, res.status(200).json({
                        totalCount: totalCount,
                        data: reports
                    })];
            case 3:
                err_1 = _d.sent();
                next(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.geTLostReport = geTLostReport;
var getLostReportById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, lostReport, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, LostReport_1.default.findById(id).populate('category')];
            case 1:
                lostReport = _a.sent();
                if (!lostReport) {
                    throw new not_found_error_1.default("Lost report not found");
                }
                return [2 /*return*/, res.status(200).json(lostReport)];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getLostReportById = getLostReportById;
var deleteLostReport = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, lostReport, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, LostReport_1.default.findByIdAndDelete(id)];
            case 1:
                lostReport = _a.sent();
                if (!lostReport) {
                    throw new not_found_error_1.default("Lost report not found");
                }
                return [2 /*return*/, res.status(200).send("You have successfully deleted the report")];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteLostReport = deleteLostReport;
// export const UpdateReport = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const id = req.params.id;
//         const lostReport = await LostReport.findByIdAndUpdate(id, req.body)
//         if (!lostReport) {
//             throw new NotFoundError("Lost report not found")
//         }
//         return res.status(200).json(lostReport).send("You have successfully updated the report status")
//     } catch (error) {
//         next(error)
//     }
// }
var UpdateReport = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updateData, existingReport, previousStatus, updatedReport, smsMessage, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                id = req.params.id;
                updateData = req.body;
                return [4 /*yield*/, LostReport_1.default.findById(id)];
            case 1:
                existingReport = _a.sent();
                if (!existingReport)
                    throw new not_found_error_1.default("Lost report not found");
                previousStatus = existingReport.status;
                return [4 /*yield*/, LostReport_1.default.findByIdAndUpdate(id, updateData, { new: true })];
            case 2:
                updatedReport = _a.sent();
                if (!(updatedReport &&
                    previousStatus !== updatedReport.status)) return [3 /*break*/, 6];
                if (!updatedReport.email) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, utils_1.sendStatusUpdateEmail)(updatedReport.email, updatedReport.name, updatedReport.referanceNo, updatedReport.status)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (!updatedReport.phoneNo) return [3 /*break*/, 6];
                smsMessage = "Hi ".concat(updatedReport.name, ", your lost report (Ref: ").concat(updatedReport.referanceNo, ") status has been updated to '").concat(updatedReport.status, "'.");
                return [4 /*yield*/, (0, utils_1.sendSMS)(updatedReport.phoneNo, smsMessage)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/, res.status(200).json(updatedReport)];
            case 7:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.UpdateReport = UpdateReport;
var getLostProductByCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var category, lostReport, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                category = req.query.category;
                return [4 /*yield*/, LostReport_1.default.find({ category: category })];
            case 1:
                lostReport = _a.sent();
                if (!lostReport) {
                    throw new not_found_error_1.default("Lost report not found");
                }
                return [2 /*return*/, res.status(200).json(lostReport).send()];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getLostProductByCategory = getLostProductByCategory;
//# sourceMappingURL=lostItems.js.map