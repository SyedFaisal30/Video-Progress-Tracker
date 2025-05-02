import express from 'express'
import dotenv from 'dotenv'
import progressRoutes from './routes/progressRoutes'
import videoRoutes from './routes/video.route'
import cors from 'cors'


dotenv.config()
const app = express()

app.use(cors({
    origin: ["http://localhost:5173","https://123lms00-5173.inc1.devtunnels.ms"],
    credentials: true
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended: true,limit:"16kb"}));
app.use(express.static("public"))


app.use('/api/progress', progressRoutes)

app.use('/api/videos', videoRoutes);

export  { app }
