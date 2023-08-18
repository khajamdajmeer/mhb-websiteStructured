import { combineReducers } from "redux";
import loading from "./LodingReducer";


const reducer = combineReducers({
    load:loading,
    
})
export default reducer