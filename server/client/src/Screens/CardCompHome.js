import React from "react";
import { Link } from "react-router-dom";
const Cardcomp = ({ title, img, content, id }) => {
  return (
    <>
      <Link
        className="container row blog Link"
        data-aos="fade-up"
        to={{ pathname: `/getblog/${id}` }}
      >
        <div className=" imgcontsp row blog colcomp" data-aos="fade-down">
          <img
            src={img}
            className="img-fluid  userimg2  col-12 col-md-12 col-lg-12 "
            alt="Food card"
          />
        </div>
        <h2 className="text-center">{title}</h2>
        <p>{content.substring(0, 150) + "...."}</p>
      </Link>
    </>
  );
};

export default Cardcomp;
