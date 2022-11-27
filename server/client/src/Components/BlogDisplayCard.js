import React from "react";
import comfood from "../Images/comfood.jpg";
import { useState } from "react";
import cf from "../Images/cf2.jpg";
// import ss from "uploads/"
import { Link } from "react-router-dom";

const Userdisplay = ({
  name,
  title,
  food,
  content,
  ind,
  id,
  imglink,
  type,
  DeleteBlogFn,
}) => {
  return (
    <>
      <Link
        className="dcont container col-11 col-lg-3 col-md-3  Link center_imp"
        data-aos="fade-up"
        to={{ pathname:type!=="displayall"?'':`/getblog/${id}` }}
      >
        <div className="row">
          <div className="col-12 ">
            <h5 className="text-center">
              <Link to={{ pathname: `/getblog/${id}` }} className="Link">
                {title}
              </Link>
            </h5>
          </div>
          <div className=" d-flex justify-content-center">
            <div
              className=" imgcontsp row blog colcomp me-2 ms-2"
              data-aos="fade-down"
            >
              <img
                src={!imglink ? (ind % 2 === 0 ? cf : comfood) : imglink}
                alt="food img"
                className="img-fluid userimg "
              />
            </div>
          </div>

          <div className="col-12 mx-auto">
            <h5 className="text-center"> {food}</h5>
          </div>

          <div className="col-12 mx-auto text-center usercont ">
            {content.substring(0, 100)}....
          </div>
          <div className="col-12 mx-auto mt-2 blogby">
            <h6>By : {name} </h6>
          </div>

          {type !== "displayall" ? (
            <>
              <button className="readmore calbtn mx-auto mb-2 imgbtn col-4 col-lg-3 col-md-3">
                <Link to={{ pathname: `/updateblog/${id}` }} className="Link">
                  Edit
                </Link>
              </button>
              <button
                className="readmore calbtn mx-auto mb-2 imgbtn col-4 col-lg-3 col-md-3"
                onClick={()=>DeleteBlogFn(id)}
              >
                {/* <Link to={{ pathname: `/deleteblog/${id}` }} className="Link"> */}
                Delete
                {/* </Link> */}
              </button>
            </>
          ) : null}
        </div>
      </Link>
    </>
  );
};

export default Userdisplay;
