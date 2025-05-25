"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const progressRoutes_1 = __importDefault(require("./routes/progressRoutes"));
const video_route_1 = __importDefault(require("./routes/video.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://123lms00-5173.inc1.devtunnels.ms"],
    credentials: true
}));
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use(express_1.default.static("public"));
app.use('/api/progress', progressRoutes_1.default);
app.use('/api/videos', video_route_1.default);
app.use('/api/users', user_route_1.default);
