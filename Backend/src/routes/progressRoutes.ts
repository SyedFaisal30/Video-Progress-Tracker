import express from 'express'
import { saveProgress, getProgress } from '../controllers/progresstracker.controller'

const router = express.Router()

router.post('/', saveProgress)
router.get('/', getProgress)

export default router
