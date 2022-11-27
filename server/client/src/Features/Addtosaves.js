import React, { useEffect, useState } from "react";
import { AddToLikedBlogs, RemoveLikedBlog } from "../actions/SavedActions";
import { useDispatch } from "react-redux";
const AddtoSaves = ({ usersaved, blogid, blogname, liked, likes }) => {
  const dispatch = useDispatch();
  const [saved, setsaved] = useState(usersaved);
  const savetheblog = async () => {
    try {
      //Actually to save the blog
      dispatch(AddToLikedBlogs(blogid, blogname, liked, likes));
    } catch (e) {
      console.log(e);
    }
  };
  const unsavetheblog = async () => {
    try {
      //Actually to unsave the blog
      dispatch(RemoveLikedBlog(blogid, liked, likes));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <div
        className={` col-4 col-lg-3 col-md-3 ${
          saved ? "colorred" : "colorwht"
        } `}
        onClick={() => {
          if (saved) {
            unsavetheblog();
            setsaved(false);
          } else {
            savetheblog();
            setsaved(true);
          }
        }}
      >
        <i
          className="fa fa-heart fa-2x noanim"
          aria-hidden="true"
          title="unsaved"
        ></i>
      </div>
    </>
  );
};

export default AddtoSaves;
