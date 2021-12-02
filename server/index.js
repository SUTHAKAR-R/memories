import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose' 

import postRoutes from './routes/post'
import userRoutes from './routes/user'

mongoose.connect(process.env.DB_URI, 
	{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true },
	() => console.log('Connected to database...🍀')
)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

app.use('/post', postRoutes)
app.use('/user', userRoutes)

app.listen(process.env.PORT, () => console.log('Server running...🚀'))