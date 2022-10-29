const express = require('express')
const port = process.env.PORT || 5000
const colors = require('colors')
const connectDB = require('./config/db')
require('dotenv').config()

const { errorHandler } = require('./middleware/errorMiddleware')
connectDB()

app = express()

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit:"50mb" }))

app.use('', require('./routes/userRoutes'))
app.use('/player', require('./routes/playersRoutes'))

app.use(errorHandler)

app.listen(port, console.log(`Server is listening at port ${port}`))