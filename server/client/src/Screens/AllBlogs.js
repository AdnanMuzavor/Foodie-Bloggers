import React from "react";
import Userdisplay from "../Components/BlogDisplayCard";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../actions/GetAllBlogs";
import Loadingcomp from "./LoadingComp";
import ErrMessg from "./ErrMessage";
const Allblogs = ({ posts }) => {
  //Getting all blogs from backend through REDUX
  const AllBlogs = useSelector((state) => state.AllBlogs);
  const { loading: blogsloading, error: blogserror, AllTheBlogs } = AllBlogs;

  const [search, setsearch] = useState("");
  const [userreqposts, setuserreq] = useState(null);
  const tobottom = () => {
    window.scrollTo(500, document.body.scrollHeight);
  };

  const Searchforposts = (e) => {
    e.preventDefault();

    if (search) {
      // const userreq = AllTheBlogs.filter((ele) => {
      //   return ele.food === search;
      // });
      const Require = AllTheBlogs.filter((e) => {
        return Object.values(e)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });

      if (Require.length !== 0) {
        setuserreq(Require);
      } else {
        setuserreq(null);
        alert(`Sorry, no results for ${search}.
     Try capitalizing first character or entire word, We'll surely get back to you if we get the food you wish for!`);
        setsearch("");
      }
    } else {
      setuserreq(AllTheBlogs);
    }
    // console.log(userreqposts);
  };
  //Getting dispatch
  const dispatch = useDispatch();

  const ViewAll = (e) => {
    e.preventDefault();

    setuserreq(posts);

    // console.log(userreqposts);
  };

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  return (
    <>
      {blogsloading ? (
        <>
          <Loadingcomp></Loadingcomp>
        </>
      ) : blogserror ? (
        <>
          <ErrMessg>{blogserror}</ErrMessg>
        </>
      ) : (
        <>
          <div className=" container nobg mx-auto row d-flex justify-content-center align-items-center  mt-3">
            <div className="row d-flex flex-direction-row justify-content-space-between">
              <div className="col-12 col-md-6 col-lg-6 mx-auto">
                <button
                  className=" text-center readmore calbtn mb-2 imgbtn col-5 col-lg-3 col-md-3 "
                  onClick={tobottom}
                >
                  <p className="allbtn">Go to bottom</p>
                </button>
                <button
                  className=" text-center readmore calbtn  mb-2 imgbtn col-5 col-lg-3 col-md-3"
                  onClick={ViewAll}
                >
                  <p className="allbtn">View all blogs</p>
                </button>
              </div>
              <div className="col-12 col-md-6 col-lg-6 ">
                <div className="row d-flex flex-direction-row justify-content-space-between">
                  <input
                    type="text"
                    placeholder="Enter the food name"
                    className="col-8 col-lg-8 col-md-8 searchitem mt-3"
                    name="search"
                    value={search}
                    autoComplete="off"
                    onChange={(e) => {
                      setsearch(e.target.value);
                    }}
                  />
                  <button
                    className="text-center srchbtn readmore calbtn mx-auto mb-2 imgbtn col-3 col-lg-3 col-md-3 mt-3"
                    onClick={Searchforposts}
                  >
                    search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="allblogcont mt-1" data-aos="zoom-in">
            <div
              className="row d-flex justify-content-center"
              data-aos="fade-left"
            >
              {userreqposts !== null
                ? userreqposts.map((blog, eleno) => {
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
                  })
                : AllTheBlogs.map((blog, eleno) => {
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
        </>
      )}
    </>
  );
};

export default Allblogs;
