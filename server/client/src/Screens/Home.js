import React, { useEffect, useState } from "react";

import Homegallery from "./GalleryCompHome";
import Cardcomp from "./CardCompHome";

import Topivgive from "./TopicComp";

import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../actions/GetAllBlogs";
import Loadingcomp from "./LoadingComp";
import Userdisplay from "../Components/BlogDisplayCard";
const Home = () => {
  //Getting all blogs from backend through REDUX
  const AllBlogs = useSelector((state) => state.AllBlogs);
  const { loading: blogsloading, error: blogserror, AllTheBlogs } = AllBlogs;

  //Getting dispatch
  const dispatch = useDispatch();

  const ToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispatch(getAllBlogs());
    ToTop();
  }, []);
  return blogsloading ? (
    <Loadingcomp />
  ) : (
    <>
      <section className="d-flex justify-content-center center_imp">
        <div className="container gallery ">
          <Topivgive a1="fade-up" a2="fade-down" title="The top blogs" />
          <div className="allblogcont mt-1" data-aos="zoom-in">
            <div
              className="row d-flex justify-content-center"
              data-aos="fade-left"
            >
              {AllTheBlogs.sort((a, b) => {
                return b.likes - a.likes;
              }).map((blog, eleno) => {
                return (
                  <>
                    <Userdisplay
                      name={blog.name}
                      title={blog.title}
                      food={blog.food}
                      content={blog.content}
                      ind={eleno}
                      key={blog._id}
                      id={blog._id}
                      imglink={blog.imglink}
                      type="displayall"
                    />
 
                  </>
                );
              })}
            </div>
          </div>
        </div>

        {/* <Topivgive a1="zoom-in" a2="fade-up" title="The foodie making foods!" />
        <div className="container gallery">
          <div className="row  mx-auto">
            <Homegallery
              All={AllTheBlogs.sort((a, b) => {
                return a.likes - b.likes;
              })}
            />
          </div>
        </div> */}
      </section>
    </>
  );
};

export default Home;
