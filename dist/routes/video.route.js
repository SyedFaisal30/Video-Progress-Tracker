"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getvideos_controller_1 = require("../controllers/getvideos.controller");
const getone_video_controller_1 = require("../controllers/getone video.controller");
const router = (0, express_1.Router)();
router.get('/', getvideos_controller_1.getVideos);
router.get('/:id', getone_video_controller_1.getSingleVideo);
exports.default = router;
