import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Userdisplay from "../Components/BlogDisplayCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../actions/GetAllBlogs";
import Loadingcomp from "./LoadingComp";
import ErrMessg from "./ErrMessage";
import Notifier from "../Components/Notifier";
import {AddBlog, DeleteBlog} from "../actions/UserActions";
const Writeblog = (props) => {
  //Getting all blogs from backend through REDUX
  const AllBlogs = useSelector((state) => state.AllBlogs);
  const { loading: blogsloading, error: blogserror, AllTheBlogs } = AllBlogs;

  //getting dispatch
  const dispatch = useDispatch();

  const history = useHistory();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [title, settitle] = useState("");
  const [food, setfood] = useState("");
  const [content, setcontent] = useState("");
  const [imglink, setimglink] = useState("");
  const [status,setstatus]=useState("")
  const [message,setmessage]=useState("");
  // const [fileName, setfileName] = useState("");

  //notification handler
  const NotificationHandler = (st, msg, login) => {
    var noti = document.querySelector(".notifier");
    setstatus(st);
    setmessage(msg);
    noti.style.display = "block";
    noti.style.visibility = "visible";
    noti.style.opacity = "1";
    setTimeout(() => {
      noti.style.display = "none";
      noti.style.visibility = "hide";
      noti.style.opacity = "0.6";
    }, 3000);

  };
  const callwritepage = async () => {
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
      setemail(data.email);
      setname(data.name);
      // showuserblogs();
      if (!res.status === 200) {
        throw new Error("User not found");
      }
    } catch (e) {
      console.log(e);
      history.push("/login");
    }
  };

  const sendblogs = async () => {
    if (!title || !email || !content || !name || !food || !imglink) {
      ToTop();
     // alert(`Hey ${name},Please fill all the data.`);
      NotificationHandler("Information",`Hey ${name},Please fill all the data.`,false);
      return;
    }

    try {
      const res = await fetch("/postblog", {
        method: "POST",
        headers: {
          name,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          title,
          content,
          food,
          imglink,
        }),
      });
      const data = await res.json();
      if (data) {
        // alert("Content Received,Thank you!");
        NotificationHandler("Yey!! Success","Content Received,Thank you! Scroll down to view.",true);
        ToTop();
        dispatch(AddBlog(data));
        settitle("");
        setfood("");
        setcontent("");
        setimglink("");
      }
    } catch (e) {
      console.log(e);
    }
    // alert("Content Received,Thank you!");
    // history.push("/blogs");
  };
  const ToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const BlogDeleteHandler=async(id)=>{
    try {
      const res = await fetch(`/deleteblog/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
       // body: JSON.stringify({ props }),
      });
      const data = await res.json();
         console.log(data);
     
      //alert(`Deleted blog ${id} ${title}`);
      dispatch(DeleteBlog(id));
      ToTop();
      NotificationHandler("Success","Blog deleted!!",false);
    } catch (e) {
      console.log(e);
    }
  };

  const scroller = () => {
    window.scrollTo(0, 700);
  };
  useEffect(() => {
    callwritepage();
    // getallblogs();

    if (props.location.pathname.split("/").find((e) => e === "written")) {
      scroller();
    }
    dispatch(getAllBlogs());
  }, []);
  return (
    <>
      <div className="notifycontainer">
    <div className="notifier container">
      
      <Notifier
          status={status}
          message={message}
      />
    </div> 
    </div>
    <section className="center_imp">
      <div className="container center_imp ">
        <div className="text text-center">
          <h1>Drop your content here</h1>
        </div>

        <div className="row mt-4 ">
          <div className="col-12 col-md-12 col-lg-12">
            <form className="row " method="POST" encType="multipart/form-data">
              <div
                className="col-12 col-md-4 col-lg-4 
   d-flex justify-content-center sep"
              >
                <label for="text">Name:</label>

                <input
                  type="text"
                  placeholder="Blog By:"
                  className="item ms-2"
                  name="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  maxLength="15"
                />
              </div>
              <div
                className="col-12 col-md-4 col-lg-4 
   d-flex justify-content-center sep"
              >
                <label for="text">Title:</label>
                <input
                  type="text"
                  placeholder="Blog title"
                  className="item ms-2"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                  maxLength="20"
                />
              </div>

              <div
                className="col-12 col-md-4 col-lg-4 
   d-flex justify-content-center sep"
              >
                <label for="email">Email:</label>
                <input
                  type="email"
                  placeholder="email"
                  className="item ms-2"
                  readOnly="readonly"
                  value={email}
                />
              </div>

              <div
                className="col-12 col-md-4 col-lg-4 
   d-flex justify-content-center sep"
              >
                <label for="text">Food:</label>
                <input
                  type="text"
                  placeholder="Food in frame"
                  className="item ms-2"
                  name="food"
                  value={food}
                  onChange={(e) => setfood(e.target.value)}
                  maxLength="15"
                />
              </div>

              <div
                className="col-12 col-md-4 col-lg-4 
   d-flex justify-content-center sep"
              >
                <label for="file">Image link:</label>
                <input
                  type="text"
                  placeholder="imglink"
                  className="form-control-file item ms-2"
                  filename="imglink"
                  onChange={(e) => setimglink(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="row contactarea ">
          <div className="messagearea row mb-2 mt-3 d-flex justify-content-center ">
            <textarea
              id="text-area"
              cols="30"
              rows="10"
              className="text-field col-10 col-lg-10 col-md-10 item ms-2"
              placeholder="Your Content"
              value={content}
              onChange={(e) => setcontent(e.target.value)}
              name="content"
              maxLength="450"
            ></textarea>
          </div>

          <div className="mx-auto col-10 col-md-6 col-lg-6 cont ">
            <div className="input-group  mt-2 ">
              <input
                className="inputs mx-auto form-control"
                type="submit"
                onClick={sendblogs}
                placeholder="register"
                aria-label="register"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
      </div>
      {blogsloading ? (
        <Loadingcomp></Loadingcomp>
      ) : AllTheBlogs.filter((ele) => {
          return ele.email === email;
        }).length >= 1 ? (
        <div className="container userg">
          <h6 className="text text-center userdis">
            Here are the blogs by you, foodie {name}
          </h6>
        </div>
      ) : (
        <div className="container userg">
          <h6 className="text text-center userdis">
            There are no blogs by you, foodie {name}
          </h6>
        </div>
      )}

      <div className="container mx-auto nobg">
        <div className="row d-flex justify-content-center">
          {blogsloading ? (
            <Loadingcomp></Loadingcomp>
          ) : blogserror ? (
            <ErrMessg>{blogserror}</ErrMessg>
          ) : AllTheBlogs.filter((ele) => {
              return ele.email === email;
            }).length >= 1 ? (
            AllTheBlogs.filter((ele) => {
              return ele.email === email;
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
                    DeleteBlogFn={BlogDeleteHandler}
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

export default Writeblog;
