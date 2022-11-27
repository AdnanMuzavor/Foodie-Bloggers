import {USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS} from "../constants/UserConstants";

//Reducer for dealing with signup
export const UserSignupReducer=(state={loading:true,message:""},action)=>{
    switch(action.type){
        case USER_SIGNUP_REQUEST:
            return {loading:true};
        case USER_SIGNUP_SUCCESS:
            return {loading:false,message:action.payload}  
        case USER_SIGNUP_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state;          
    }
}


export const UserReducer=(state={UserInfo:{},error:null,loading:true},action)=>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading:true};
        case USER_SIGNIN_SUCCESS:
            return {loading:false, UserInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading:false, error:action.payload};  
        case USER_SIGNOUT:
                return {loading:false,UserInfo:null};      
        default:
            return state;
    }
}