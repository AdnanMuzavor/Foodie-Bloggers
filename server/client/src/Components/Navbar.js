import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Signout } from "../actions/UserActions";


const Navbar = () => {
  const history = useHistory();

  //Getting userDetails to check if signin or not
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading, error, UserInfo } = UserDetails;
  //Importing dispatch
  const dispatch = useDispatch();
  const SignoutHandler = () => {
    dispatch(Signout());
    history.push("");
  };

  const RenderMenu = () => {
    return (
      <>
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">
            Profile
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/blogs">
            Blogs
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">
            Contact
          </NavLink>
        </li>

        {UserInfo && UserInfo.Message !== "invalid Cridentials" ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/writeblogs">
                Write
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                {UserInfo.name}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                onClick={SignoutHandler}
              >
                Signout
              </NavLink>
            </li>
          </>
        ) : (
          <>
            {" "}
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Signin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Signup
              </NavLink>
            </li>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <NavLink className="navbar-brand navtitle" to="#" id="navtitle">
            Blooogers
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <RenderMenu />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
