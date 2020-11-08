import express from 'express'
import dotenv from 'dotenv'
import connectDB from './connection/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import HttpError from './models/http-error.js'
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send("API is running...")
})

app.use('/api/products', productRoutes)
app.use('/api/users/', userRoutes)
app.use('/api/upload/', uploadRoutes)

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404)
  return next(error)
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error occurred' })
})


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

