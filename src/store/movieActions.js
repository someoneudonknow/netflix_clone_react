import { replaceGenres } from "./movieSlice"
import { getGenres } from "../utils/api"

export const getGenresList = () => {
    return async (dispatch) => {
        try {
            const genresList = await getGenres();
            dispatch(replaceGenres(genresList));
        }catch (e) {
            console.log(e)
        }
    }
}

