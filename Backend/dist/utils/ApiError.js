"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(status, success, message = "Something went wrong", errors = [], stack = "") {
        super(message);
        this.status = status;
        this.success = success;
        this.data = null;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    toJSON() {
        return {
            status: this.status,
            success: this.success,
            message: this.message,
            errors: this.errors,
        };
    }
}
exports.ApiError = ApiError;
