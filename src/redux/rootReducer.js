import { combineReducers } from "redux";
import feedReducer from "./Feed/feedReducer";

const rootReducer = combineReducers({
  feed: feedReducer,
});

export default rootReducer;
