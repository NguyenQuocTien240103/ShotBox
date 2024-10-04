import { combineReducers } from "redux";
import uploadReducer from './upload'
const rootReducer = combineReducers({
    upload: uploadReducer,
})
export default rootReducer;