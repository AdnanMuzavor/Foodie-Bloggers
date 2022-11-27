import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Notifier from "../Components/Notifier";

const Editblog = (props) => {
  const history = useHistory();

  //Creating a state variable to get the user data
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    title: "",
    food: "",
    content: "",
    id: "",
    imglink:"",
  });
  const [status, setstatus] = useState("");
  const [message, setmessage] = useState("");
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

  
  const ToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const Userdatachanged = (event) => {
   
    event.preventDefault();

    //Getting the attributes of input tag in which change occur
    const { name, value } = event.target;
  
    //Making corresponding changes in state as well
    setuserdata({ ...userdata, [name]: value });
  };

  const sendblogs = async () => {
    const { name, email, title, food, content,imglink} = userdata;
    const res = await fetch(`/updateblog/${userdata.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        name,
        email,
        title,
        food,
        content,
        imglink,
      }),
    });
    const data = await res.json();
    if (!data) {
      ToTop();
      NotificationHandler("Oopss!!","Content could not be updated",false);
    } else {
      ToTop();
      NotificationHandler("Yey!! Success","Content updated",false);

      // console.log(userdata);

      setuserdata({ ...userdata, content: "" });
      setTimeout(() => {
        history.push("/");
      }, 4000);
      
    }
  };

  useEffect(() => {
    ToTop();
    const callgetdata = async () => {
      try {
        //Requesting fro about page
        
        const res = await fetch(`/getblog/${props.match.params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (!res.status === 200) {
          throw new Error("User not found");
        }
        setuserdata({
          ...userdata,
          email: data.email,
          name: data.name,
          title: data.title,
          food: data.food,
          content: data.content,
          id: data._id,
          imglink:data.imglink,
        });
      } catch (e) {
        console.log(e);
      }
    };

    callgetdata();
  }, []);
  return (
    <>
          <div className="notifycontainer">
            <div className="notifier container">
              <Notifier status={status} message={message} />
            </div>
          </div>
    <section className="center_imp">
      <div className="container center_imp ">
        <div className="text text-center">
          <h1>Edit your content here</h1>
        </div>

        <div className="row mt-4 ">
          <div className="col-12 col-md-12 col-lg-12">
            <form className="row " method="POST">
              <div
                className="col-12 col-md-4 col-lg-4 
   d-flex justify-content-center sep"
              >
                <label for="text">Name:</label>
                <input
                  type="text"
                  placeholder="Blog By:"
                  className="item ms-2 "
                  name="name"
                  value={userdata.name}
                  onChange={Userdatachanged}
                />
              </div>
              <div
                className="col-12 col-md-4 col-lg-4 
   d-flex justify-content-center sep"
              >
                <label for="text">Blogid:</label>
                <input
                  type="text"
                  placeholder="id"
                  className="item ms-2 "
                  name="id"
                  readOnly="readonly"
                  value={userdata.id}
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
                  value={userdata.title}
                  name="title"
                  onChange={Userdatachanged}
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
                  value={userdata.email}
                  name="editoremail"
                  readOnly="readonly"
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
                  value={userdata.food}
                  onChange={Userdatachanged}
                />
              </div>
              <div
                className="col-12 col-md-4 col-lg-4 
   d-flex justify-content-center sep"
              >
                <label for="text">Imglink:</label>
                <input
                  type="text"
                  placeholder="Food in frame"
                  className="item ms-2"
                  name="imglink"
                  value={userdata.imglink}
                  onChange={Userdatachanged}
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
              value={userdata.content}
              onChange={Userdatachanged}
              name="content"
            ></textarea>
          </div>
          <div className="mx-auto col-10 col-md-6 col-lg-6 cont ">
            <div className="input-group  mt-2 ">
              {/* <form method="POST"> */}
              <input
                className="inputs mx-auto form-control"
                type="submit"
                onClick={sendblogs}
                placeholder="register"
                aria-label="register"
                aria-describedby="basic-addon1"
              />
              {/* </form> */}
            </div>
          </div>
        </div>
      </div></section>
    </>
  );
};

export default Editblog;
