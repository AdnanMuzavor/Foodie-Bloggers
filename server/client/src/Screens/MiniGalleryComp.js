import React from "react";
const MinGallery = ({ f1, f2, f3, f4, f5, f6 }) => {
  return (
    <>
      <div
        className="row  mt-2 mb-2 ms-2 d-flex justify-content-center"
        data-aos="zoom-out"
      >
        <h5 className="text-center">People also liked these foods</h5>
        <img
          src={f1}
          className="img-fluid col-5 col-md-5 col-lg-5 me-2 mb-2 colcomp"
          alt="popular food images"
        />
        <img
          src={f2}
          className="img-fluid col-5 col-md-5 col-lg-5 me-2 mb-2 colcomp"
          alt="popular food images"
        />
        <img
          src={f3}
          className="img-fluid col-5 col-md-5 col-lg-5 me-2 mb-2 colcomp"
          alt="popular food images"
        />
        <img
          src={f4}
          className="img-fluid col-5 col-md-5 col-lg-5 me-2 mb-2 colcomp"
          alt="popular food images"
        />
        <h5 className="text-center">People also viewed</h5>
        <img
          src={f5}
          className="img-fluid col-5 col-md-5 col-lg-5 me-2 mb-2 colcomp"
          alt="popular food images"
        />
        <img
          src={f6}
          className="img-fluid col-5 col-md-5 col-lg-5 me-2 mb-2 colcomp"
          alt="popular food images"
        />
      </div>
    </>
  );
};

export default MinGallery;
