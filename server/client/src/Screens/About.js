import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import person from "../Images/person.png";
import Topivgive from "./TopicComp";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../actions/GetAllBlogs";
import Loadingcomp from "./LoadingComp";
import ErrMessg from "./ErrMessage";
import Userdisplay from "../Components/BlogDisplayCard";
const About = () => {
  const saved = useSelector((state) => state.saved);
  const { savedblogs } = saved;
  const AllBlogs = useSelector((state) => state.AllBlogs);
  const { loading: blogsloading, error: blogserror, AllTheBlogs } = AllBlogs;

  const dispatch = useDispatch();

  //Creating a state variable to get the user data
  const [userdata, setuserdata] = useState({});
  // const [postss,setpostss]=useState([]);

  //Using hsotory to push user to login incase anything goes wrong
  const history = useHistory();
  // const setlength=()=>{

  //Using useeffect to call a function which is to be called each time when about page is requested, so that user is verified using token

  useEffect(() => {
    const callaboutpage = async () => {
      try {
        //Requesting fro about page

        const res = await fetch("/about", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          cridentials: "include",
        });
        const data = await res.json();

        if (!res.status === 200) {
          throw new Error("User not found");
        }
        setuserdata(data);
      } catch (e) {
        history.push("/login");
      }
    };

    callaboutpage();

    dispatch(getAllBlogs());
    setTimeout(() => {}, 2000);
  }, []);

  return blogsloading ? (
    <Loadingcomp />
  ) : (
    <>
    <section className="center_imp">
      <Topivgive
        a1="zoom-out"
        a2="fade-down"
        title="A page about you, for you by us!"
      />
      <div className="container center_imp">
        <div className="row">
          <div className="col-md-4 col-lg-4 col-12 mt-2">
            <img alt="User Icon" src={person} className="img-fluid bnone" />
          </div>
          <div className="col-md-6 col-lg-6 col-12">
            <form method="GET" className="text-center">
              <h2>Name: {userdata.name === "" ? "User" : userdata.name}</h2>
              <h4>Work: {userdata.work === "" ? "User" : userdata.work}</h4>

              <ul className="nav  " role="tablist">
                <li className="nav-item">About</li>
                <Link
                  className="nav-item Link"
                  to={{ pathname: "/writeblogs" }}
                >
                  Write
                </Link>
                <Link
                  className="nav-item Link"
                  onClick={() => window.scrollTo(0, 500)}
                >
                  Saved{" "}
                </Link>
                <Link
                  className="nav-item Link"
                  to={{ pathname: "/writeblogs/written" }}
                >
                  Written
                </Link>
              </ul>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-10 col-lg-8 ">
            <div className="tab-content profile-tab" id="myTabContent">
              <div
                className="tab-pane fade show active me-4"
                id="home"
                role="tabpanel"
                area-labelledby="home-tab"
              >
                <div className="row mt-2 ">
                  <div className="col-6 col-md-6 col-lg-6 text-center">
                    <label>Usern ID</label>
                  </div>
                  <div className="col-6 col-md-6 col-lg-6">
                    <p>{userdata._id === "" ? "User" : userdata._id}</p>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-6 col-md-6 col-lg-6 text-center">
                    <label>Name</label>
                  </div>
                  <div className="col-6 col-md-6 col-lg-6">
                    <p>{userdata.name === "" ? "User" : userdata.name}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 col-md-6 col-lg-6 text-center">
                    <label>Email</label>
                  </div>
                  <div className="col-6 col-md-6 col-lg-6">
                    <p>{userdata.email === "" ? "User" : userdata.email}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 col-md-6 col-lg-6 text-center">
                    <label>Phone</label>
                  </div>
                  <div className="col-6 col-md-6 col-lg-6">
                    <p>{userdata.phone === "" ? "User" : userdata.phone}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 col-md-6 col-lg-6 text-center">
                    <label>Profession</label>
                  </div>
                  <div className="col-6 col-md-6 col-lg-6">
                    <p>{userdata.work === "" ? "User" : userdata.work}</p>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade "
                id="profile"
                role="tabpanel"
                area-labelledby="profile-tab"
              >
                <div className="row">
                  <div className="col-5 col-md-6 col-lg-6">
                    <label>Profession</label>
                  </div>
                  <div className="col-5 col-md-6 col-lg-6">
                    <p>Web Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {blogsloading ? (
        <Loadingcomp></Loadingcomp>
      ) : AllTheBlogs.filter((e1) => {
          return savedblogs.find((e) => e === e1._id);
        }).length >= 1 ? (
        <div className="container userg">
          <h6 className="text text-center userdis">
            Here are the save blogs by you
          </h6>
        </div>
      ) : (
        <div className="container userg">
          <h6 className="text text-center userdis">
            There are no saved blogs by you
          </h6>
        </div>
      )}

      <div className="container mx-auto nobg">
        <div className="row d-flex justify-content-center">
          {blogsloading ? (
            <Loadingcomp></Loadingcomp>
          ) : blogserror ? (
            <ErrMessg>{blogserror}</ErrMessg>
          ) : AllTheBlogs.filter((e1) => {
              return savedblogs.find((e) => e === e1._id);
            }).length >= 1 ? (
            AllTheBlogs.filter((e1) => {
              return savedblogs.find((e) => e === e1._id);
            }).map((blog, index) => {
              return (
                <>
                  <Userdisplay
                    name={blog.name}
                    title={blog.title}
                    food={blog.food}
                    content={blog.content}
                    ind={index}
                    id={blog._id}
                    key={blog._id}
                    imglink={blog.imglink}
                    type="displayall"
                  />
                </>
              );
            })
          ) : null}
        </div>
      </div></section>
    </>
  );
};

export default About;
