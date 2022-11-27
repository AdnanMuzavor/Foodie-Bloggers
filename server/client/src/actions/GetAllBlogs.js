import {
  ALL_BLOGS_FAIL,
  ALL_BLOGS_REQUEST,
  ALL_BLOGS_SUCCESS,
} from "../constants/Blogloadingconstants";

export const getAllBlogs = () => async (dispatch) => {
  dispatch({ type: ALL_BLOGS_REQUEST });
  try {
    const res = await fetch("/getblog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch({ type: ALL_BLOGS_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: ALL_BLOGS_FAIL, payload: e.message });
  }
};
