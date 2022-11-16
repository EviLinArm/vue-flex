import { ImdbMovie } from "./movies.interfaces";
import {ImdbRequests} from "./utils/helper/imdb.helper";

const {searchMovie, getMovie} = ImdbRequests()

export const searchInImdb = async (query: string): Promise<Partial<ImdbMovie>> => {
    const { data: { result } } = await searchMovie(query)
    const [movie] = result
    return movie
}

export const getMovieFromImdb = async (imdbId: string): Promise<Partial<ImdbMovie>> => {
    const {data} = await getMovie(imdbId)
    return data
}