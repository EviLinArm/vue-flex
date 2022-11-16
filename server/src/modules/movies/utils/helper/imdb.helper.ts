import 'dotenv/config'
import {GetCreditsResponse, ImdbMovie, Movie, SearchMovieResponse} from "../../movies.interfaces";
import {stringify} from "qs";
import axios from "axios";
import {IMDB_SEARCH_URL} from "../../movies.const";

export const ImdbRequests = () => {
    const queryParams = stringify({
        language: 'ru',
        api_key: process.env.IMDB_SECRET,
    })
    const MOVIE_URL = `${IMDB_SEARCH_URL}/movie`

    return {
        getMovie: (ImdbId:string) => axios.get<ImdbMovie>(`${MOVIE_URL}/${ImdbId}?${queryParams}`),
        getMovieCredits: (ImdbId:number) => axios.get<GetCreditsResponse>(`${MOVIE_URL}/${ImdbId}/credits?${queryParams}`),
        searchMovie: (query: string) => axios.get<SearchMovieResponse>(`${MOVIE_URL}/search/movie?${queryParams}&query=${query}`),
    }
}

export const getMovieCredits = async (ImdbId: number) => {
    try {
        const {getMovieCredits} = ImdbRequests()
        const {data: {crew, cast}} = await getMovieCredits(ImdbId)
        const actors = cast.map(({name}) => name)
        const { name = '' } = crew.find(({job}) => job === 'Director')
        return {
            actors,
            director: name
        }
    } catch (e) {
        console.log(e)
        return {
            actors: [],
            director: ''
        }
    }
}

export const convertMovie = async ({
    title,
    overview,
    release_date,
    id
    }: ImdbMovie): Promise<Movie> => {
    const {actors, director} = await getMovieCredits(id)
    return {
        title,
        plot: overview,
        year: new Date(release_date).getFullYear().toString(),
        actors,
        director,
        boxOffice: "",
        fileName: "",
        genres: [],
        imdbId: "",
        magnet: "",
        poster: "",
        rated: "",
        ratingImbd: "",
        released: "",
        runtime: "",
        sourceUrl: "",
        trailer: "",
        writer: "",
    }
}