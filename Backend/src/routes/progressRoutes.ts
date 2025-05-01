import express from 'express'
import { saveProgress, getProgress } from '../controllers/progressController'

const router = express.Router()

router.post('/', saveProgress)
router.get('/', getProgress)

export default router
