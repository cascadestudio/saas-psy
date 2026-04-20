"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["PRACTITIONER"] = "PRACTITIONER";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["PATIENT"] = "PATIENT";
})(UserRole || (exports.UserRole = UserRole = {}));
var SessionStatus;
(function (SessionStatus) {
    SessionStatus["CREATED"] = "CREATED";
    SessionStatus["SENT"] = "SENT";
    SessionStatus["STARTED"] = "STARTED";
    SessionStatus["COMPLETED"] = "COMPLETED";
    SessionStatus["EXPIRED"] = "EXPIRED";
    SessionStatus["CANCELLED"] = "CANCELLED";
})(SessionStatus || (exports.SessionStatus = SessionStatus = {}));
