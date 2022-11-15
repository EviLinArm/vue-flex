import 'dotenv/config'
import {stringify} from "qs";
import axios from "axios";
import {IMDB_SEARCH_URL} from "./movies.const";

export const searchInImdb = async (query) => {
    const queryParams = stringify({
        language: 'ru',
        api_key: process.env.IMDB_SECRET,
        query
    })
    const { data: { results } } = await axios.get(`${IMDB_SEARCH_URL}/search/movie?${queryParams}`)
    const [movie] = results

    return movie
}

export const getMovieFromImdb = async (imdbId: string) => {
    const queryParams = stringify({
        language: 'ru',
        api_key: process.env.IMDB_SECRET,
    })
    const result = await axios.get(`${IMDB_SEARCH_URL}/movie?${imdbId}?${queryParams}`)
    return result.data
}