import React, { useState } from "react";

const LikeBlog = ({ blogid, userliked, likescount, refresher, refresh }) => {
  const [like, setlikes] = useState(likescount);
  const [incremented, setincremented] = useState(userliked);
  const UpdateLikeHandler = async (type, likes) => {
    try {
      //  alert(`${type}->${likes}`);

      const res = await fetch(`/updatelike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogid, likes, type }),
      });
      const data = await res.json();
      console.log(`likes updated ${data}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div
        className={` col-4 col-lg-3 col-md-3 ${
          incremented ? "colorblue" : "colorwht"
        }`}
        onClick={() => {
          if (incremented) {
            setlikes(like - 1 < 0 ? 0 : like - 1);
            UpdateLikeHandler("decrement", like - 1 < 0 ? 0 : like - 1);
            setincremented(false);
          } else {
            setlikes(like + 1);
            UpdateLikeHandler("increment", like + 1);
            setincremented(true);
          }

          setTimeout(() => {
            // refresher(refresh===true?false:true);
          }, 3000);
        }}
      >
        <i class="fa fa-thumbs-up fa-2x noanim  mb-3" aria-hidden="true"></i>{" "}
        {like}
      </div>
    </>
  );
};

export default LikeBlog;
