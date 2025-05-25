import express from 'express'
import dotenv from 'dotenv'
import progressRoutes from './routes/progressRoutes'
import videoRoutes from './routes/video.route'
import userRoutes from './routes/user.route'
import cors from 'cors'


dotenv.config()
const app = express()

app.use(cors({
    origin: ["http://localhost:5173","https://videomilestone.vercel.app"],
    credentials: true
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended: true,limit:"16kb"}));
app.use(express.static("public"))


app.use('/api/progress', progressRoutes)

app.use('/api/videos', videoRoutes);

app.use('/api/users', userRoutes);

export  { app }
