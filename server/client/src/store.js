import {useReducer} from "react";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { AllBlogsReducer } from "./reducers/AllBlogsReducer";
import {SavedReducer} from "./reducers/SavedBlogReducers";
import {UserReducer, UserSigninReducer, UserSignupReducer} from "./reducers/UserReducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    UserDetails:{
        UserInfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem('userInfo')):null,
    },
    saved:{
      savedblogs:localStorage.getItem("savedblogs")?JSON.parse(localStorage.getItem('savedblogs')):[],
    }
};

const reducer = combineReducers({
  AllBlogs: AllBlogsReducer,
  UserSignUp:UserSignupReducer,
  UserDetails:UserReducer,
  saved:SavedReducer,
});
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
