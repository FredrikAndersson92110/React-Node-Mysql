import { GET_FAVORITES, ADD_TO_FAVORITES, DELETE_FROM_FAVORITES } from "../actions"; 

const initialState = {
    favoriteData: []
}

function Favorite(state = initialState, action) {
    switch(action.type) {
        case GET_FAVORITES:
            let favData = JSON.parse(localStorage.getItem("fav"));
            if (favData) {
                state.favoriteData = favData; 
            }
            return state;
        case ADD_TO_FAVORITES: 
            let isHere = false; 
            let pay = action.payload; ;
            for (let i = 0; i < state.favoriteData.length; i++) {
                const element = state.favoriteData[i];
                if (element === pay) {
                    isHere = true; 
                }
            }
            if (isHere === false) {
                let localState = state.favoriteData;
                localState.push(action.payload); 
                state.favoriteData = localState; 
                localStorage.getItem("Fav", JSON.stringify(localState));   
            } else {
                console.log("this user is allready a favorite");
            }
            return state;
        case DELETE_FROM_FAVORITES:
            let value = action.payload;
            let array = state.favoriteData;
            array = array.filter(item => item !== value); 
            state.favoriteData = array; 
            localStorage.setItem("Fav", JSON.stringify(array));
            return state; 
        default:
            return state; 
    }
}

export default Favorite; 

