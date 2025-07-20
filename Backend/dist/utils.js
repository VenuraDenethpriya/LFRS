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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = exports.sendStatusUpdateEmail = exports.sendConfirmationEmail = exports.buildLostReportQuery = exports.asyncHandler = void 0;
var resend_1 = require("resend");
var auth_1 = require("@vonage/auth");
var sms_1 = require("@vonage/sms");
var asyncHandler = function (fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
var buildLostReportQuery = function (params) {
    var query = {};
    if (params.referance)
        query.referanceNo = params.referance;
    if (params.category)
        query.category = { $in: [params.category] };
    if (params.location)
        query.location = params.location;
    if (params.policeStation)
        query.nearestPoliceStation = params.policeStation;
    if (params.district)
        query.district = params.district;
    if (params.date)
        query.dateOfLost = new Date(params.date);
    return query;
};
exports.buildLostReportQuery = buildLostReportQuery;
var resend = new resend_1.Resend(process.env.RESEND_API_KEY);
var sendConfirmationEmail = function (to, reportData, reportType) { return __awaiter(void 0, void 0, void 0, function () {
    var subject, greeting, emailResponse, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                subject = reportType === 'FOUND'
                    ? 'Found Item Report Confirmation'
                    : 'Lost Item Report Confirmation';
                greeting = reportType === 'FOUND'
                    ? 'Thank you for reporting a found item. Below is the summary of your submission:'
                    : 'Thank you for submitting your lost item report. Below is the summary of your report for your reference:';
                return [4 /*yield*/, resend.emails.send({
                        from: 'LFRS <onboarding@resend.dev>', // or verified domain
                        to: to,
                        subject: subject,
                        html: "\n      <div style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333;\">\n        <h2 style=\"color: #2d6cdf;\">".concat(subject, "</h2>\n        <p>Dear ").concat(reportData.name, ",</p>\n        <p>").concat(greeting, "</p>\n\n        <table style=\"border-collapse: collapse; margin-top: 10px;\">\n          <tr>\n            <td><strong>Reference No:</strong></td>\n            <td>").concat(reportData.referanceNo, "</td>\n          </tr>\n          <tr>\n            <td><strong>Item(s):</strong></td>\n            <td>").concat(reportData.items, "</td>\n          </tr>\n          <tr>\n            <td><strong>Category:</strong></td>\n            <td>").concat(Array.isArray(reportData.category) ? reportData.category.join(', ') : reportData.category, "</td>\n          </tr>\n          <tr>\n            <td><strong>Date:</strong></td>\n            <td>").concat(new Date(reportData.dateOfLost).toLocaleDateString(), "</td>\n          </tr>\n          <tr>\n            <td><strong>Time:</strong></td>\n            <td>").concat(reportData.timeOfLost, "</td>\n          </tr>\n          <tr>\n            <td><strong>Location:</strong></td>\n            <td>").concat(reportData.location, "</td>\n          </tr>\n          <tr>\n            <td><strong>District:</strong></td>\n            <td>").concat(reportData.district, "</td>\n          </tr>\n          <tr>\n            <td><strong>Nearest Police Station:</strong></td>\n            <td>").concat(reportData.nearestPoliceStation, "</td>\n          </tr>\n        </table>\n\n        ").concat(reportData.description
                            ? "<p><strong>Description:</strong> ".concat(reportData.description, "</p>")
                            : '', "\n\n        <p style=\"margin-top: 20px;\">Our team will review your report and notify you of any updates.</p>\n\n        <p>If you need to make changes or provide additional details, please contact us at <a href=\"mailto:support@yourdomain.com\">support@yourdomain.com</a>.</p>\n\n        <p style=\"margin-top: 30px;\">Regards,<br/>Lost & Found Reporting System Team</p>\n        <hr/>\n        <p style=\"font-size: 12px; color: #888;\">This is an automated email. Please do not reply to this message.</p>\n      </div>\n    "),
                    })];
            case 1:
                emailResponse = _a.sent();
                console.log('Email sent:', emailResponse);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error('Error sending confirmation email:', err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendConfirmationEmail = sendConfirmationEmail;
var sendStatusUpdateEmail = function (to, name, referenceNo, newStatus) { return __awaiter(void 0, void 0, void 0, function () {
    var statusDescriptionMap, description, subject, emailResponse, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                statusDescriptionMap = {
                    LOST: 'Your item is still marked as lost.',
                    FOUND: 'Good news! Your item has been found.',
                    INFORMED: 'You’ve been informed about a potential match.',
                    COLLECTED: 'Your item has been collected.',
                    NOT_COLLECTED: 'Your item is yet to be collected.',
                    REMOVED: 'Your report has been closed or removed.',
                };
                description = statusDescriptionMap[newStatus.toUpperCase()] ||
                    "The status of your report has been updated to \"".concat(newStatus, "\".");
                subject = "Update: Report ".concat(referenceNo, " Status Changed to ").concat(newStatus);
                return [4 /*yield*/, resend.emails.send({
                        from: 'LFRS <onboarding@resend.dev>',
                        to: to,
                        subject: subject,
                        html: "\n        <div style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333;\">\n          <h2 style=\"color: #2d6cdf;\">Report Status Update</h2>\n          <p>Dear ".concat(name, ",</p>\n          <p>We would like to inform you that the status of your lost/found item report with <strong>Reference No: ").concat(referenceNo, "</strong> has been updated.</p>\n          <p><strong>New Status:</strong> ").concat(newStatus, "</p>\n          <p>").concat(description, "</p>\n          <p>If you have any questions, feel free to contact us at <a href=\"mailto:support@yourdomain.com\">support@yourdomain.com</a>.</p>\n          <p style=\"margin-top: 30px;\">Regards,<br/>Lost & Found Reporting System Team</p>\n          <hr/>\n          <p style=\"font-size: 12px; color: #888;\">This is an automated email. Please do not reply to this message.</p>\n        </div>\n      "),
                    })];
            case 1:
                emailResponse = _a.sent();
                console.log('Status update email sent:', emailResponse);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.error('Error sending status update email:', err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendStatusUpdateEmail = sendStatusUpdateEmail;
var smsClient = new sms_1.SMS(new auth_1.Auth({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET,
}));
var sendSMS = function (to, message) { return __awaiter(void 0, void 0, void 0, function () {
    var response, msg, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, smsClient.send({
                        to: to,
                        from: 'LFRS',
                        text: message,
                    })];
            case 1:
                response = _a.sent();
                msg = response.messages[0];
                if (msg.status === '0') {
                    console.log('SMS sent successfully');
                }
                else {
                    console.error("SMS failed: ".concat(msg.errorText));
                }
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error('Error sending SMS:', err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendSMS = sendSMS;
//# sourceMappingURL=utils.js.map