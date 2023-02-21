import { replaceTVGenres } from "./TVSlice";
import { getTVGenres } from "../utils/api"

export const getTVGenresList = () => {
    return async (dispatch) => {
        try {
            const genresList = await getTVGenres();
            dispatch(replaceTVGenres(genresList));
        }catch (e) {
            console.log(e)
        }
    }
}

