import mongoose from 'mongoose'
import app from './app'

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGODB_URI!

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => console.error(err))
