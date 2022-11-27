import React from "react";

const CarouselBlock = ({ content, img }) => {
  return (
    <>
      <div className="container">
        <div className="row carimg">
          <img src={img} alt="carousel food" className="col-12 col-md-12 col-lg-12" />
        </div>
        <div className="row">
          <h3 className="title text-center ">{content}</h3>
        </div>
      </div>
    </>
  );
};

export default CarouselBlock;
