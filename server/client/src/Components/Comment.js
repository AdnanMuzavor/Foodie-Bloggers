import React from "react";

const Comment = ({ username, comment, key }) => {
  return (
    <>
      <div className="commentwrap row" key={key}>
        <div className=" col-md-12 col-lg-12 col-12">
          <h5 className="compd">{comment}</h5>
          <h6 className="compd">By: {username}</h6>
        </div>
      </div>
    </>
  );
};

export default Comment;
