
//Extra page

import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import fp from "../Images/fp.jpg";
const ResetPassword=()=>{

      //Defining state for email separately so that change function can be defined on spot
  const [email, setemail] = useState("");

  const PasswordReset=()=>{

  }
    return(
        <>
<div className="container ">
        <div className="row mx-auto mb-4 alligncenter mt-4 me-1 ms-1  ">
          {/* for image            */}
          <div className="inner-cont  col-10 col-md-6 col-lg-6 col mt-3 mb-3 ">
            <div className=" imgcontsp row blog colcomp">
              <img alt="Login" src={fp} className="img-fluid inimg" />
            </div>
          </div>

          {/* For form filling */}

          <div className="inner-cont col-12 col-md-6 col-lg-6 col ">
            <div className="header row text-center">
              <h3>Reset Password</h3>
              <hr className="mx-auto w-50 sp" />
            </div>

            <div className="formpart row d-flex justify-content-center">
              <form className="row" method="POST">
                <div className="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="icon fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  <input
                    className="inputs"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    class="form-control"
                    autoComplete="off"
                    placeholder="Your email"
                    aria-label="Your email"
                    aria-describedby="basic-addon1"
                  />
                </div>

                

                <div className="input-group mb-3">
                  <input
                    className="inputs"
                    type="submit"
                    value="Send Reset Code"
                    onClick={PasswordReset}
                    class="form-control"
                    placeholder="Send Reset Code"
                    aria-label="Send Reset Code"
                    aria-describedby="basic-addon1"
                  />
                </div>

                <div class="input-group mb-3 text-center mx-auto row">
                  <Link to="/signup" className="Link text-center">
                    Not registered? Click here
                  </Link>
                </div>
{/* {
  state===true?  <div class="input-group mb-1 text-center mx-auto row">
  <Link to="/logout" className="Link text-center">
    Want to logout? Click here
  </Link>
</div>:null
} */}
              
              </form>
            </div>
          </div>
        </div>
      </div>

        </>
    )
}

export default ResetPassword;