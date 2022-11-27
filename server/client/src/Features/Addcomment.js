import React from "react";
import { useState, useEffect } from "react";

import Loadingcomp from "../Screens/LoadingComp";
const AddComment = ({ blogid, UserInfo }) => {
  const [liked, setliked] = useState(true);
  const [comment, setcomment] = useState("");
  const [commentstate, setcommentstate] = useState(false);
  const [Allcomments, setAllcomments] = useState([]);
  const [Commentload, setCommentload] = useState(false);
  const addcomment = async (e) => {
    e.preventDefault();
    //setCommentload(true);
    const res = await fetch(`/addcommentblog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogid, comment, liked }),
    });
    const data = await res.json();
  
    setcomment("");
    if (data) {
      setAllcomments((prev)=>[data,...prev]);
      // console.log(`Comment is: `+data.commentedblogs);
      // setTimeout(() => {
      //   commentstate === true ? setcommentstate(false) : setcommentstate(true);
      //   setCommentload(false);
      // }, 2000);
    }
  };
  useEffect(() => {
    const setthecomments = async () => {
      //setblogloading(true);
      try {
        const res = await fetch(`/getblog/${blogid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        setAllcomments(data.commentedblogs);
      } catch (e) {
        console.log(e);
      }
    };

    setthecomments();
  }, [commentstate]);
  return Commentload ? (
    <Loadingcomp />
  ) : (
    <>
      <div className="row d-flex justify-content-center align-items-center mt-3">
        <div className="col-md-5 col-lg-5 col-12 commentmain ">
          <div className="header row text-center">
            <h3>Add your comment</h3>
            <hr className="mx-auto w-50 sp" />
          </div>
          {UserInfo.Message !== "invalid Cridentials" ? (
            <div className="formpart row d-flex justify-content-center">
              <form className="row">
                <div className="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i class="icon fas fa-comment-dots"></i>
                  </span>
                  <input
                    className="inputs"
                    type="comment"
                    name="comment"
                    value={comment}
                    onChange={(e) => setcomment(e.target.value)}
                    class="form-control"
                    autoComplete="off"
                    placeholder="Your comment "
                    aria-label="Your comment "
                    aria-describedby="basic-addon1"
                    maxLength="15"
                  />
                </div>

                <div className="input-group mb-3">
                  <input
                    className="inputs"
                    type="submit"
                    value="Add"
                    onClick={addcomment}
                    class="form-control"
                    placeholder="Add"
                    aria-label="Add"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </form>
            </div>
          ) : (
            <div>Usr not signin</div>
          )}
        </div>
        <div className=" imgcontsp col-md-5 col-lg-5 col-10 blog colcomp2 mx-auto ">
          <h1 className="mx-auto text-center">Comments</h1>
          <div className=" imgcontsp row blog colcomp mx-auto comcomp">
            {Allcomments.length >= 1 ? (
              Allcomments.map((e) => (
                <div className="commentwrap row" key={e._id}>
                  <div className=" col-md-12 col-lg-12 col-12">
                    <h5 className="compd">{e.comment}</h5>
                    <h6 className="compd">By: {e.username}</h6>
                  </div>
                </div>
              ))
            ) : (
              <div className="commentwrap">
                <h2 className="text-center">No comments</h2>
                <h4 className="text-center">Be the first one,to add one.</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddComment;
