"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const progressController_1 = require("../controllers/progressController");
const router = express_1.default.Router();
router.post('/', progressController_1.saveProgress);
router.get('/', progressController_1.getProgress);
exports.default = router;
