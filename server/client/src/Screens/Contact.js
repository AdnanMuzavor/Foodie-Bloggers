import React from "react";
import { useState, useEffect } from "react";
import Notifier from "../Components/Notifier";
import LoadingComp from "./LoadingComp";
const Contact = () => {
  const [posting,setposting]=useState(false);
  //Creating a state variable to get the user data
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    message: "",
    address: "",
  });
  const [status, setstatus] = useState("");
  const [message, setmessage] = useState("");
  //Using useeffect to call a function which is to be called each time when about page is requested, so that user is verified using token
  useEffect(() => {
    //Defining callgetdata function which first autheticates user and thn only displays the data
    const callgetdata = async () => {
      try {
        //Requesting fro about page

        const res = await fetch("/about", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (!res.status === 200) {
          throw new Error("User not found");
        }
        setuserdata((userdata) => {
          return {
            ...userdata,
            name: data.name,
            email: data.email,
            phone: data.phone,
            work: data.work,
          };
        });
      } catch (e) {
        console.log(e);
      }
    };

    callgetdata();
  }, []);

  //Defining a function which will set the respective states when changed with the help of their names

  const Userdatachanged = (event) => {
    event.preventDefault();

    //Getting the attributes of input tag in which change occur
    const { name, value } = event.target;

    //Making corresponding changes in state as well
    setuserdata({ ...userdata, [name]: value });
  };

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
  //Creating function to send data to database

  const sendmessage = async () => {
    //Destructuring data
    //setposting(true);
    const { name, email, phone, message } = userdata;
   
    if(!name || !email || !phone || !message){
     ToTop();
      NotificationHandler("Empty Fields", "Please enter all the fields", false);
      return;
    }
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();
    if (!data) {
      ToTop();
      NotificationHandler("Empty Fields", "Please enter all the fields", false);
      return;
    } else {
        ToTop();
      NotificationHandler("Success", "Message Received", false);
   
      setuserdata({ ...userdata, message: "" });
     // setposting(false);
     // return;
    }
  };

  return posting?<LoadingComp/>:(
    <>
        <div className="notifycontainer">
            <div className="notifier container">
              <Notifier status={status} message={message} />
            </div>
          </div>
    <section className="center_imp">
      <div className="container imgcont1 ">
        <div className="container mt-2 ">
          <div className="row text-center ">
            <h2 className="wht">Connect with us</h2>
          </div>
        </div>
        <div className="container ">
          <div className="row contact_topbar ">
            <div className="col-10 col-md-3 col-lg-3 div">
              <div className="userinfo d-flex ">
                <div className="sticker">
                  <i className="iconper fa fa-phone" aria-hidden="true"></i>
                </div>
                <div className="innerinfo">
                  <div className="title wht">Phone number</div>
                  <div className="number wht">
                    {userdata.phone === "" ? "1234123412" : userdata.phone}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-10 col-md-3 col-lg-3 div">
              <div className="userinfo d-flex ">
                <div className="sticker">
                  <i className="iconper fa fa-envelope" aria-hidden="true"></i>
                </div>
                <div className="innerinfo">
                  <div className="title wht">Email</div>
                  <div className="number wht">
                    {userdata.email === ""
                      ? "Useremail@gmail.com"
                      : userdata.email}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-10 col-md-3 col-lg-3 div">
              <div className="userinfo d-flex ">
                <div className="sticker">
                  <i className="iconper fa fa-building" aria-hidden="true"></i>
                </div>
                <div className="innerinfo">
                  <div className="title wht">Address</div>
                  <div className="number wht">
                    {userdata.address ? userdata.address : "No address"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container ">
          <div className="text text-center">
            <h1>Get in Touch</h1>
          </div>

          <div className="row mt-4 ">
            <div className="col-12 col-md-12 col-lg-12">
              <form className="row " method="POST">
                <div
                  className="col-12 col-md-3 col-lg-3 
               d-flex justify-content-center sep"
                >
                  <input
                    type="text"
                    placeholder="Name"
                    className="item"
                    name="name"
                    value={userdata.name === "" ? "Username" : userdata.name}
                    autoComplete="off"
                    onChange={Userdatachanged}
                  />
                </div>
                <div
                  className="col-12 col-md-3 col-lg-3 
               d-flex justify-content-center sep"
                >
                  <input
                    type="email"
                    placeholder="email"
                    className="item"
                    value={
                      userdata.email === ""
                        ? "Useremail@gmail.com"
                        : userdata.email
                    }
                    name="email"
                    autoComplete="off"
                    onChange={Userdatachanged}
                  />
                </div>
                <div
                  className="col-12 col-md-3 col-lg-3 
               d-flex justify-content-center sep"
                >
                  <input
                    type="number"
                    placeholder="phone number"
                    className="item"
                    name="phone"
                    value={
                      userdata.phone === "" ? "1234123412" : userdata.phone
                    }
                    autoComplete="off"
                    onChange={Userdatachanged}
                  />
                </div>
                <div
                  className="col-12 col-md-3 col-lg-3 
               d-flex justify-content-center sep"
                >
                  <input
                    type="text"
                    placeholder="Address"
                    className="item"
                    value={userdata.address}
                    autoComplete="off"
                    name="address"
                    onChange={Userdatachanged}
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="row contactarea ">
            <div className="messagearea row mb-2 mt-3 d-flex justify-content-center ">
              <textarea
                name="message"
                id="text-area"
                cols="30"
                rows="10"
                className="text-filed col-10 col-lg-10 col-md-10 item"
                placeholder="Your Message"
                value={userdata.message}
                autoComplete="off"
                onChange={Userdatachanged}
              ></textarea>
            </div>
          </div>

          <div className="mx-auto col-10 col-md-6 col-lg-6 cont ">
            <div className="input-group calbtn text  mt-2 ">
              {/* <form method="POST"> */}
              <input
                className="inputs mx-auto form-control"
                type="submit"
                onClick={sendmessage}
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

export default Contact;