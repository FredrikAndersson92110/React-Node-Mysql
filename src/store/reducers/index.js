import { combineReducers } from "redux";
import Favorite from "./favorite_reducer"; 
import Users from "./users_reducer"; 

const rootReducer = combineReducers({
    Favorite,
    Users
}); 

export default rootReducer; 
