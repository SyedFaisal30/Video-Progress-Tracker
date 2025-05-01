import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import progressRoutes from './routes/progressRoutes'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/progress', progressRoutes)

export default app
