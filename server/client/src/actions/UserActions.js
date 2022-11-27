//Action for user signup

import { ADD_BLOG, DELETE_BLOG } from "../constants/Blogloadingconstants";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNOUT,
} from "../constants/UserConstants";
//Action for juser Sign-up
export const Usersignup = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST, payload: user });
  const { name, email, phone, work, password, cpassword } = user;
  try {
    //Sending this destructred data to path register by converting to json
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    const data = await response.json();
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: USER_SIGNUP_FAIL, payload: e.message });
  }
};
export const Signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  console.log("Inside sign in function");
  try {
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: "Invalid Cridentials" });
    } else {
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    }
  } catch (e) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: e.message });
    console.log(`error ${e}`);
  }
};

export const Signout = () => async (dispatch) => {
  fetch("/logout", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    cridentials: "include",
  })
    .then((res) => {
      dispatch({ type: USER_SIGNOUT });

      if (res.status !== 200) {
        throw new Error("Logout not done");
      } else {
        //alert("User logged out");

        localStorage.removeItem("userInfo");
        localStorage.removeItem("savedblogs");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};



export const DeleteBlog = (id) => (dispatch) => {
  dispatch({ type: DELETE_BLOG, payload: id });
};

export const AddBlog=(blog)=>(dispatch)=>{
  alert("Data recieve dformadding to blogs")
  console.log(blog);
  dispatch({type:ADD_BLOG,payload:blog});
}
