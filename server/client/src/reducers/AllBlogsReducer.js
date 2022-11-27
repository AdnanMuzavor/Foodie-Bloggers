import {ADD_BLOG, ALL_BLOGS_FAIL, ALL_BLOGS_REQUEST, ALL_BLOGS_SUCCESS, DELETE_BLOG} from "../constants/Blogloadingconstants";

export const AllBlogsReducer=(state={AllTheBlogs:[],loading:true},action)=>{
    switch(action.type){
        case ALL_BLOGS_REQUEST:
            return {loading:true};
        case ALL_BLOGS_SUCCESS:
            return {loading:false,AllTheBlogs:action.payload}  
        case ALL_BLOGS_FAIL:
            return {loading:false,error:action.payload}
        case DELETE_BLOG:
            return {loading:false,AllTheBlogs:state.AllTheBlogs.filter((blog)=>blog._id!=action.payload)}   
        case ADD_BLOG:
            return {loading:false,AllTheBlogs:[...state.AllTheBlogs,action.payload]}     
        default:
            return state;          
    }
}