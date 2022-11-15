import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import * as path from 'path'

import streamRouter from '../src/modules/stream/stream.controller'
import contentRouter from '../src/modules/content/content.controller'
import moviesRouter from '../src/modules/movies/movies.controller'

const app = express()
app.use(cors())
app.use(express.json())
app.use(logger('dev'))
// app.set('views', path.join(__dirname, 'views'))

app.use('/stream', streamRouter)
app.use('/content', contentRouter)
app.use('/movies', moviesRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

