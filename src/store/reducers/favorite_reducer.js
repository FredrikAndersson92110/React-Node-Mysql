import { GET_FAVORITES, ADD_TO_FAVORITES, DELETE_FROM_FAVORITES } from "../actions"; 

const initialState = {
    favoritedata:[]
}

function Favorite(state = initialState, action) {
    switch(action.type) {
        case GET_FAVORITES:
            let favData = JSON.parse(localStorage.getItem("Fav"));
            if (favData) {
                state.favoritedata = favData; 
            }
            return state;
            // end
        case ADD_TO_FAVORITES: 
            let isHere = false; 
            let pay = action.payload;
            for (let i = 0; i < state.favoritedata.length; i++) {
                const element = state.favoritedata[i];
                if (element === pay) {
                    isHere = true; 
                }
            }
            if (isHere === false) {
                let localState = state.favoritedata;
                localState.push(action.payload); 
                state.favoritedata = localState; 
                localStorage.setItem("Fav", JSON.stringify(localState));   
            } else {
                console.log("this user is allready a favorite");
            }
            return state;
            //end 
        case DELETE_FROM_FAVORITES:
            let value = action.payload;
            let array = state.favoritedata;
            array = array.filter(item => item !== value); 
            state.favoritedata = array; 
            localStorage.setItem("Fav", JSON.stringify(array));
            return state; 
        default:
            return state; 
    }
}

export default Favorite; 

