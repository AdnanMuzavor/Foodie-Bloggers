import React, { useEffect, useState } from "react";

import comfood from "../Images/comfood.jpg";
import { useSelector, useDispatch } from "react-redux";
import Loadingcomp from "./LoadingComp";
import { Link } from "react-router-dom";
import AddComment from "../Features/Addcomment";
import AddtoSaves from "../Features/Addtosaves";
import LikeBlog from "../Features/LikeTheblog";
const Onlyblog = (props) => {
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading, error, UserInfo } = UserDetails;
  const saved = useSelector((state) => state.saved);
  const { savedblogs } = saved;
  const [blog, setblog] = useState({
    name: "",
    title: "",
    food: "",
    content: "",
    id: "",
    imglink: "",
    likes: "",
  });
  const dispatch = useDispatch();
  const [refresh, setrefresh] = useState(false);
  const [usersaved, setusersaved] = useState(false);
  const [userliked, setuserliked] = useState(false);
  const [blogid, setblogid] = useState("");
  const [liked, setliked] = useState(false);
  const [blogloading, setblogloading] = useState(false);

  const [likes, setlikes] = useState(0);
  const scroller = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const settheblog = async () => {
      setblogloading(true);
      try {
        setlikes(0);
        const res = await fetch(`/getblog/${props.match.params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        //Getting blog and setting it
        setblog({
          ...blog,
          name: data.name,
          title: data.title,
          food: data.food,
          content: data.content,
          id: data._id,
          imglink: data.imglink,
          likes: data.likes ? data.likes : 0,
        });
        //Setting no. of likes
        setlikes(data.likes ? data.likes : 0);

        //Get list of blogs liked by user
        if (UserInfo) {
          const res2 = await fetch(`/getlikedids/${UserInfo._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const userdata = await res2.json();

          //Finding if current blog is liked by user
          if (userdata.likedbyuser) {
            userdata.likedbyuser.find((e) => e.blogid === data._id)
              ? setuserliked(true)
              : setuserliked(false);
          }
          setblogid(data._id);
          setTimeout(() => {
            setblogloading(false);
          }, 3000);

          //Finding if blog was saved by user or not
          if (savedblogs.find((e) => e === data._id)) {
            console.log("Blog found");
            setusersaved(true);
            setliked(true);
          } else {
            setusersaved(false);
            setliked(false);
          }
          console.log(savedblogs);
        } else {
          setblogid(data._id);
          setblogloading(false);
          setusersaved(false);
          setliked(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    settheblog();
    scroller();
  }, [UserInfo]);
  return blogloading ? (
    <Loadingcomp />
  ) : (
    <>
      <section className="center_imp">
        <div className="container userg center_imp">
          <h6 className="text text-center userdis">
            Blog you wished to look at!
          </h6>
        </div>
        <div className="container gallery mt-3 ">
          <div className="row  mx-auto d-flex justify-content-center mt-2 mb-2">
            <div className="col-md-10 col-lg-10 col-12 ">
              {UserInfo ? (
                <>
                  <AddtoSaves
                    usersaved={usersaved}
                    blogid={blog.id}
                    blogname={blog.name}
                    liked={liked}
                    likes={likes}
                  />
                  <LikeBlog
                    userliked={userliked}
                    likescount={likes}
                    blogid={blogid}
                    refresher={setrefresh}
                    refresh={refresh}
                  />
                </>
              ) : null}
            </div>
          </div>
          <div className="row  mx-auto d-flex justify-content-center mt-2 mb-2">
            <div className="col-md-5 col-lg-5 col-12 ">
              <div className=" imgcontsp row blog colcomp" data-aos="fade-down">
                <img
                  src={blog.imglink ? blog.imglink : comfood}
                  alt="selected blog"
                  className="img-fluid  col-10 col-md-10 col-lg-10 "
                />
              </div>
            </div>
            <div className="col-md-5 col-lg-5 col-12 ms-2">
              <h2 className="text-center">{blog.title}</h2>
              <h4 className="text-center">{blog.food}</h4>
              <p className="contsize">{blog.content}</p>
              <div className="writer">
                <strong>Blog by:</strong>
                <h4>
                  <strong>{blog.name}</strong>
                </h4>
              </div>
            </div>
            {UserInfo ? (
              <AddComment blogid={blog.id} UserInfo={UserInfo} />
            ) : (
              <div className="mt-3 container text-center spmessage">
                {" "}
                <Link className="Link" to={{ pathname: "/login" }}>
                  Login to see tye comments and add your own comment
                </Link>{" "}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Onlyblog;
