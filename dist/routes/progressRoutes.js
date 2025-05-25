"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const saveprogress_controller_1 = require("../controllers/saveprogress.controller");
const getprogress_controller_1 = require("../controllers/getprogress.controller");
const router = express_1.default.Router();
router.post('/', saveprogress_controller_1.saveProgress);
router.get("/:username/:videoId", getprogress_controller_1.getUserVideoProgress);
exports.default = router;
