import express from 'express'
import { saveProgress } from '../controllers/saveprogress.controller'
import { getUserVideoProgress } from '../controllers/getprogress.controller'

const router = express.Router()

router.post('/', saveProgress)
router.get("/:username/:videoId", getUserVideoProgress);

export default router
