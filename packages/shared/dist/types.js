"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentType = exports.PayrollStatus = exports.LeaveStatus = exports.LeaveType = exports.AttendanceStatus = exports.UserRole = void 0;
// User roles for role-based access control
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["HR"] = "HR";
    UserRole["CFO"] = "CFO";
    UserRole["EMPLOYEE"] = "EMPLOYEE";
    UserRole["SYSTEM_ADMIN"] = "SYSTEM_ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
// Attendance status options
var AttendanceStatus;
(function (AttendanceStatus) {
    AttendanceStatus["PRESENT"] = "PRESENT";
    AttendanceStatus["ABSENT"] = "ABSENT";
    AttendanceStatus["LATE"] = "LATE";
    AttendanceStatus["LEAVE"] = "LEAVE";
})(AttendanceStatus || (exports.AttendanceStatus = AttendanceStatus = {}));
// Leave types
var LeaveType;
(function (LeaveType) {
    LeaveType["ANNUAL"] = "ANNUAL";
    LeaveType["SICK"] = "SICK";
    LeaveType["MATERNITY"] = "MATERNITY";
    LeaveType["PATERNITY"] = "PATERNITY";
    LeaveType["UNPAID"] = "UNPAID";
})(LeaveType || (exports.LeaveType = LeaveType = {}));
// Leave status options
var LeaveStatus;
(function (LeaveStatus) {
    LeaveStatus["PENDING"] = "PENDING";
    LeaveStatus["APPROVED"] = "APPROVED";
    LeaveStatus["REJECTED"] = "REJECTED";
})(LeaveStatus || (exports.LeaveStatus = LeaveStatus = {}));
// Payroll status options
var PayrollStatus;
(function (PayrollStatus) {
    PayrollStatus["DRAFT"] = "DRAFT";
    PayrollStatus["PROCESSED"] = "PROCESSED";
    PayrollStatus["PAID"] = "PAID";
})(PayrollStatus || (exports.PayrollStatus = PayrollStatus = {}));
// Document type options
var DocumentType;
(function (DocumentType) {
    DocumentType["CONTRACT"] = "CONTRACT";
    DocumentType["CERTIFICATE"] = "CERTIFICATE";
    DocumentType["IDENTIFICATION"] = "IDENTIFICATION";
    DocumentType["PERFORMANCE_REVIEW"] = "PERFORMANCE_REVIEW";
    DocumentType["OTHER"] = "OTHER";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
