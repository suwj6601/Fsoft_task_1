import { combineReducers } from "redux";
import { movieReducer } from "./reducer";

const root = combineReducers({
  movieReducer,
});

export default root;
