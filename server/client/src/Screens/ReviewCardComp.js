import React from "react";

const ReviewCard = ({ img, review, anim }) => {
  return (
    <>
      <div className="card" data-aos={anim}>
        <img alt="Review Card" className="card-img-top img-fluid" src={img} />
        <div className="card-body">
          <p className="card-text">{review}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
