"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uniqueuser_controller_1 = require("../controllers/uniqueuser.controller");
const router = express_1.default.Router();
router.get("/check-username/:username", uniqueuser_controller_1.checkOrCreateUser);
exports.default = router;
