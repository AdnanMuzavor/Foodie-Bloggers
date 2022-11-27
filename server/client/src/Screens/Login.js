import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import siginin from "../Images/signin.jpg";

import { Signin} from "../actions/UserActions";
import Notifier from "../Components/Notifier";

const Login = () => {
  const dispatch = useDispatch();

  //Getting userDetails to check if signin or not
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading, error, UserInfo } = UserDetails;

  //Destructuring conetxt imported
  // const { state, dispatch } = useContext(usercontext);

  //Defining variable history whose "push" variable will be used to direct us to home
  const history = useHistory();

  //Defining state for email and password separately so that change function can be defined on spot
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [status,setstatus]=useState("")
  const [message,setmessage]=useState("");
  //Defining a function to send datab to route "/login"

  const Logindata = async (e) => {
    e.preventDefault();

    dispatch(Signin(email, password));

    if (error && !UserInfo) {
     // alert("Invalid Cridentials!");
      var  noti=document.querySelector(".notifier");
      setstatus("Failed");
      setmessage("Inavlid Cridentials");
      noti.style.display="block"; 
      noti.style.visibility="visible";
      noti.style.opacity="0.9";
      setTimeout(() => {
        noti.style.display="none"; 
        noti.style.visibility="hide";
        noti.style.opacity="0.6";
      }, 2000);
   
   
    }
  };
  const ToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
   

    if (UserInfo !== undefined && UserInfo !== null) {
      ToTop();
      setstatus("Success");
      setmessage("User logged in")
      var  noti=document.querySelector(".notifier");
      noti.style.display="block"; 
      noti.style.visibility="visible";
      noti.style.opacity="1";
      setTimeout(() => {
        noti.style.display="none"; 
        noti.style.visibility="hide";
        noti.style.opacity="0.6";
      }, 2000);
   
      setTimeout(() => {
       history.push("/");
        
      }, 2500);
     
    }
  }, [UserInfo]);
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
   
      <div className="container center_imp">
        <div className="row mx-auto mb-4 alligncenter mt-4 me-2 ms-2  ">
          {/* for image            */}
          <div className="inner-cont  col-10 col-md-6 col-lg-6 col mt-3 mb-3 ">
            <div className=" imgcontsp row blog colcomp">
              <img alt="Login" src={siginin} className="img-fluid inimg" />
            </div>
          </div>

          {/* For form filling */}

          <div className="inner-cont col-12 col-md-6 col-lg-6 col ">
            <div className="header row text-center ">
              <h3 className="signup"> Sign up</h3>
              <hr className="mx-auto w-50" />
            </div>

            <div className="formpart row d-flex justify-content-center">
              <form method="POST" className="row">
                <div className="signup input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="icon fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control inputs"
                    placeholder="Your email"
                    aria-label="Your email"
                    aria-describedby="basic-addon1"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>

                <div className="signup input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="icon fa fa-key" aria-hidden="true"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control inputs "
                    placeholder="password"
                    aria-label="password"
                    aria-describedby="basic-addon1"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>

                <div className="signup  input-group mb-3 szouter">
                  <input
                    type="submit"
                    className="szalter calbtn form-control inputs"
                    placeholder="register"
                    aria-label="register"
                    aria-describedby="basic-addon1"
                    name="name"
                    autoComplete="off"
                    onClick={Logindata}
                  />
                </div>
                <div class="input-group mb-3 text-center mx-auto row">
                  <Link to="/signup" className="Link text-center">
                    Not registered? Click here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
