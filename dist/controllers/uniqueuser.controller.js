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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOrCreateUser = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const user_model_1 = require("../models/user.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const ApiError_1 = require("../utils/ApiError");
const dbConnect_1 = __importDefault(require("../utils/dbConnect"));
exports.checkOrCreateUser = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConnect_1.default)();
    const { username } = req.params;
    if (!username) {
        throw new ApiError_1.ApiError(400, false, "Username is required");
    }
    const existingUser = yield user_model_1.User.findOne({ username });
    if (existingUser) {
        throw new ApiError_1.ApiError(409, false, "Username already exists");
    }
    const newUser = new user_model_1.User({ username });
    yield newUser.save();
    return res.status(201).json(new ApiResponse_1.ApiResponse(201, newUser, "Username created successfully"));
}));
