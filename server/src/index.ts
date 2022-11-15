import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import logger from 'morgan'
// import * as path from 'path'
import * as mongoose from "mongoose";

import streamRouter from '../src/modules/stream/stream.controller'
import contentRouter from '../src/modules/content/content.controller'
import moviesRouter from '../src/modules/movies/movies.controller'

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo OK'))
    .catch((err) => console.log('Mongo error', err));

const app = express()
app.use(cors())
app.use(express.json())
app.use(logger('dev'))

// app.set('views', path.join(__dirname, 'views'))

app.use('/stream', streamRouter)
app.use('/content', contentRouter)
app.use('/movies', moviesRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

