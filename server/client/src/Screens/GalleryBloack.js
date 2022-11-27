import React from "react";
import { Link } from "react-router-dom";
const Galleryblock = ({ content, img, id }) => {
  return (
    <>
      <Link
        className=" row blog mt-2 Link mb-2"
        data-aos="fade-up"
        to={{ pathname: `/getblog/${id}` }}
      >
        <div className="col-12 col-md-12 col-lg-12">
          <h5 className="text-center titletxt">
            {content.substring(0, 12) + ".."}
          </h5>
        </div>
        <div className=" imgcontsp row blog colcomp" data-aos="fade-down">
          <img
            src={img}
            alt="Food in gallery"
            className="img-fluid col-12 col-md-12 col-lg-12 "
          />
        </div>
      </Link>
    </>
  );
};

export default Galleryblock;
