"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(status, data, message = "Success") {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}
exports.ApiResponse = ApiResponse;
