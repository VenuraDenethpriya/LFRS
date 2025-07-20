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
exports.getDashboardData = void 0;
var LostReport_1 = __importDefault(require("../infrastructure/schemas/LostReport"));
var FoundReport_1 = __importDefault(require("../infrastructure/schemas/FoundReport"));
var Category_1 = __importDefault(require("../infrastructure/schemas/Category"));
var getDashboardData = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var LostFoundReportTotal, InformedReportTotal, CollectedReportTotal, NotCollectedReportTotal, RemoveReportTotal, LostReportTotal, FoundReportTotal, InformedFoundReportTotal, ClaimedFoundReportTotal, RemoveFoundReportTotal, NotCollectedFoundReportTotal, AllLostReportTotal, AllFoundReportTotal, startDate, TotalLostReportForLast3Months, TotalFoundReportForLast3Months, endDate, lostTotal, totalLostReportInMonth, foundTotal, totalFoundReportInMonth, TOtalLostREportInEveryMonth, district, TotalLostReportBassedOnDistric, TotalFoundReportBassedOnDistric, categories, categoryNames, TotalLostReportByCategory, TotalFoundReportByCategory, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 24, , 25]);
                return [4 /*yield*/, LostReport_1.default.countDocuments({ status: 'FOUND' })];
            case 1:
                LostFoundReportTotal = _a.sent();
                return [4 /*yield*/, LostReport_1.default.countDocuments({ status: 'IMFORMED' })];
            case 2:
                InformedReportTotal = _a.sent();
                return [4 /*yield*/, LostReport_1.default.countDocuments({ status: 'COLLECTED' })];
            case 3:
                CollectedReportTotal = _a.sent();
                return [4 /*yield*/, LostReport_1.default.countDocuments({ status: 'NOT COLLECTED' })];
            case 4:
                NotCollectedReportTotal = _a.sent();
                return [4 /*yield*/, LostReport_1.default.countDocuments({ status: 'REMOVED' })];
            case 5:
                RemoveReportTotal = _a.sent();
                return [4 /*yield*/, LostReport_1.default.countDocuments({ status: 'LOST' })];
            case 6:
                LostReportTotal = _a.sent();
                return [4 /*yield*/, FoundReport_1.default.countDocuments({ status: 'FOUND' })];
            case 7:
                FoundReportTotal = _a.sent();
                return [4 /*yield*/, FoundReport_1.default.countDocuments({ status: 'IMFORMED' })];
            case 8:
                InformedFoundReportTotal = _a.sent();
                return [4 /*yield*/, FoundReport_1.default.countDocuments({ status: 'COLLECTED' })];
            case 9:
                ClaimedFoundReportTotal = _a.sent();
                return [4 /*yield*/, FoundReport_1.default.countDocuments({ status: 'REMOVED' })];
            case 10:
                RemoveFoundReportTotal = _a.sent();
                return [4 /*yield*/, FoundReport_1.default.countDocuments({ status: 'NOT COLLECTED' })];
            case 11:
                NotCollectedFoundReportTotal = _a.sent();
                return [4 /*yield*/, LostReport_1.default.countDocuments()];
            case 12:
                AllLostReportTotal = _a.sent();
                return [4 /*yield*/, FoundReport_1.default.countDocuments()];
            case 13:
                AllFoundReportTotal = _a.sent();
                startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 12);
                return [4 /*yield*/, LostReport_1.default.aggregate([
                        {
                            $match: {
                                dateOfLost: {
                                    $gte: startDate,
                                    $lte: new Date()
                                }
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    $dateToString: { format: "%Y-%m-%d", date: "$dateOfLost" }
                                },
                                total: { $sum: 1 }
                            }
                        },
                        {
                            $sort: { _id: 1 } // Sort by date ascending
                        },
                        {
                            $project: {
                                date: "$_id",
                                total: 1,
                                _id: 0
                            }
                        }
                    ])];
            case 14:
                TotalLostReportForLast3Months = _a.sent();
                return [4 /*yield*/, FoundReport_1.default.aggregate([
                        {
                            $match: {
                                dateOfFound: {
                                    $gte: startDate,
                                    $lte: new Date()
                                }
                            }
                        }, {
                            $group: {
                                _id: {
                                    $dateToString: { format: "%Y-%m-%d", date: "$dateOfFound" }
                                },
                                total: { $sum: 1 }
                            }
                        },
                        {
                            $sort: { _id: 1 } // Sort by date ascending
                        },
                        {
                            $project: {
                                date: "$_id",
                                total: 1,
                                _id: 0
                            }
                        }
                    ])];
            case 15:
                TotalFoundReportForLast3Months = _a.sent();
                startDate.setMonth(startDate.getMonth() - 1); // 1 month ago
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date();
                endDate.setHours(23, 59, 59, 999);
                return [4 /*yield*/, LostReport_1.default.countDocuments({
                        dateOfLost: {
                            $gte: startDate,
                            $lte: endDate
                        }
                    })];
            case 16:
                lostTotal = _a.sent();
                totalLostReportInMonth = {
                    lostTotal: lostTotal,
                    startDate: startDate,
                    endDate: endDate
                };
                return [4 /*yield*/, FoundReport_1.default.countDocuments({
                        dateOfFound: {
                            $gte: startDate,
                            $lte: endDate
                        }
                    })];
            case 17:
                foundTotal = _a.sent();
                totalFoundReportInMonth = {
                    foundTotal: foundTotal,
                    startDate: startDate,
                    endDate: endDate
                };
                return [4 /*yield*/, LostReport_1.default.aggregate([
                        {
                            $match: {
                                dateOfLost: {
                                    $gte: startDate,
                                    $lte: endDate
                                }
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    $dateToString: { format: "%Y-%m-%d", date: "$dateOfLost" }
                                },
                                total: { $sum: 1 }
                            }
                        },
                        {
                            $sort: { _id: 1 } // Sort by date ascending
                        },
                        {
                            $project: {
                                date: "$_id",
                                total: 1,
                                _id: 0
                            }
                        }
                    ])];
            case 18:
                TOtalLostREportInEveryMonth = _a.sent();
                district = [
                    "Colombo", "Gampaha", "Kalutara",
                    "Kandy", "Matale", "Nuwara Eliya",
                    "Galle", "Matara", "Hambantota",
                    "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu",
                    "Trincomalee", "Batticaloa", "Ampara",
                    "Kurunegala", "Puttalam",
                    "Anuradhapura", "Polonnaruwa",
                    "Badulla", "Monaragala",
                    "Ratnapura", "Kegalle"
                ];
                return [4 /*yield*/, LostReport_1.default.aggregate([
                        {
                            $match: {
                                district: {
                                    $in: district // Make sure 'district' is defined
                                }
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    date: { $dateToString: { format: "%Y-%m-%d", date: "$dateOfLost" } },
                                    district: "$district"
                                },
                                total: { $sum: 1 }
                            }
                        },
                        {
                            $sort: { "_id.date": 1 }
                        },
                        {
                            $project: {
                                district: "$_id.district",
                                total: 1,
                                _id: 0
                            }
                        }
                    ])];
            case 19:
                TotalLostReportBassedOnDistric = _a.sent();
                return [4 /*yield*/, FoundReport_1.default.aggregate([
                        {
                            $match: {
                                district: {
                                    $in: district
                                }
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    date: { $dateToString: { format: "%Y-%m-%d", date: "$dateOfFound" } },
                                    district: "$district"
                                },
                                total: { $sum: 1 }
                            }
                        },
                        {
                            $sort: { "_id.date": 1 }
                        },
                        {
                            $project: {
                                district: "$_id.district",
                                total: 1,
                                _id: 0
                            }
                        }
                    ])];
            case 20:
                TotalFoundReportBassedOnDistric = _a.sent();
                return [4 /*yield*/, Category_1.default.find({}, "name").lean()];
            case 21:
                categories = _a.sent();
                categoryNames = categories.map(function (cat) { return cat.name; });
                return [4 /*yield*/, LostReport_1.default.aggregate([
                        {
                            $match: {
                                category: { $in: categoryNames }
                            }
                        },
                        {
                            $group: {
                                _id: "$category",
                                total: { $sum: 1 }
                            }
                        },
                        {
                            $sort: { _id: 1 }
                        },
                        {
                            $project: {
                                category: "$_id",
                                total: 1,
                                _id: 0
                            }
                        }
                    ])];
            case 22:
                TotalLostReportByCategory = _a.sent();
                return [4 /*yield*/, FoundReport_1.default.aggregate([
                        {
                            $match: {
                                category: { $in: categoryNames }
                            }
                        },
                        {
                            $group: {
                                _id: "$category",
                                total: { $sum: 1 }
                            }
                        },
                        {
                            $sort: { _id: 1 }
                        },
                        {
                            $project: {
                                category: "$_id",
                                total: 1,
                                _id: 0
                            }
                        }
                    ])];
            case 23:
                TotalFoundReportByCategory = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        LostFoundReportTotal: LostFoundReportTotal,
                        InformedReportTotal: InformedReportTotal,
                        CollectedReportTotal: CollectedReportTotal,
                        NotCollectedReportTotal: NotCollectedReportTotal,
                        RemoveReportTotal: RemoveReportTotal,
                        LostReportTotal: LostReportTotal,
                        FoundReportTotal: FoundReportTotal,
                        InformedFoundReportTotal: InformedFoundReportTotal,
                        ClaimedFoundReportTotal: ClaimedFoundReportTotal,
                        RemoveFoundReportTotal: RemoveFoundReportTotal,
                        NotCollectedFoundReportTotal: NotCollectedFoundReportTotal,
                        TotalLostReportForLast3Months: TotalLostReportForLast3Months,
                        TotalFoundReportForLast3Months: TotalFoundReportForLast3Months,
                        totalLostReportInMonth: totalLostReportInMonth,
                        totalFoundReportInMonth: totalFoundReportInMonth,
                        TOtalLostREportInEveryMonth: TOtalLostREportInEveryMonth,
                        TotalLostReportBassedOnDistric: TotalLostReportBassedOnDistric,
                        TotalFoundReportBassedOnDistric: TotalFoundReportBassedOnDistric,
                        TotalLostReportByCategory: TotalLostReportByCategory,
                        TotalFoundReportByCategory: TotalFoundReportByCategory,
                        AllLostReportTotal: AllLostReportTotal,
                        AllFoundReportTotal: AllFoundReportTotal
                    })];
            case 24:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Internal Server Error' })];
            case 25: return [2 /*return*/];
        }
    });
}); };
exports.getDashboardData = getDashboardData;
//# sourceMappingURL=dashboard.js.map