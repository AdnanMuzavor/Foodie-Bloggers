import {
  BLOG_SAVED,
  BLOG_UNSAVED,
  SAVE_BLOG_REQUEST,
  SAVE_BLOG_FAIL,
} from "../constants/SavedBlog";
export const AddToLikedBlogs =
  (blogid, name, liked, likes) => async (dispatch, getState) => {
    //Sending details we want each item in our cart to haveinform of object sended via payload
    dispatch({
      type: SAVE_BLOG_REQUEST,
      payload: {
        blogid,
        name,
      },
    });
    try {
      dispatch({ type: BLOG_SAVED, payload: blogid });

      localStorage.setItem(
        "savedblogs",
        JSON.stringify(getState().saved.savedblogs)
      );
    } catch (e) {
      dispatch({ type: SAVE_BLOG_FAIL, payload: e });
    }
  };

//Action to remove item from cart
export const RemoveLikedBlog =
  (blogid, liked, likes) => async (dispatch, getState) => {
    //This dispatch will induce action under which product with given id will get filtered from cartitems
    try {
      dispatch({ type: BLOG_UNSAVED, payload: blogid });

      const s1 = localStorage.getItem("savedblogs");

      localStorage.setItem(
        "savedblogs",
        JSON.stringify(getState().saved.savedblogs)
      );
    } catch (e) {}
    dispatch({ type: BLOG_UNSAVED, payload: blogid });
  };
