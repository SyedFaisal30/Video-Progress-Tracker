"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
const dbConnect_1 = __importDefault(require("./utils/dbConnect"));
dotenv_1.default.config({ path: "./.env" });
(0, dbConnect_1.default)()
    .then(() => {
    const PORT = process.env.PORT || 8000;
    app_1.app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
});
