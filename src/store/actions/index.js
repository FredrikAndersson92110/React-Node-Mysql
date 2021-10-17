export const GET_FAVORITES = "GET_FAVORITES";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const DELETE_FROM_FAVORITES =  "DELETE_FROM_FAVORITES"; 

// get favorite State
export function getFavoriteState() {
    const action = {
        type: GET_FAVORITES
    }
    return action;
}

// add data to fav list
export function addToFavorites(item) {
    const action = {
        type: ADD_TO_FAVORITES,
        payload: item
    }
    return action;
}

// Delete from favorites 
export function deleteFromFavorites(item) {
    const action = {
        type: DELETE_FROM_FAVORITES, 
        payload: item
    }
    return action;
}

