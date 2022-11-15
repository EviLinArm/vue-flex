import { Router } from 'express'
import * as movieService from './movies.service'
import * as imdbService from './imdb.service'
import {CreateMovieRequest, SearchRequest} from "./movies.interfaces";

const router = Router();

router.get('/search', async ({ query: { searchTerm } }: SearchRequest, res) => {
    try {
        const results = await movieService.movieSearch(searchTerm)
        res.status(200).send(results)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/imdb-search', async ({ query: { searchTerm } }: SearchRequest, res) => {
    try {
        const results = await imdbService.searchInImdb(searchTerm)
        res.status(200).send(results)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/imdb/imdbId', async ({ params: { imdbId } }: SearchRequest, res) => {
    try {
        const results = await imdbService.getMovieFromImdb(imdbId)
        res.status(200).send(results)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/', async ({ body }: CreateMovieRequest, res) => {
    try {
        const result = await movieService.create(body)
        res.status(200).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/', async (_, res) => {
    try {
        const result = await movieService.findAll()
        res.status(200).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

export default router;