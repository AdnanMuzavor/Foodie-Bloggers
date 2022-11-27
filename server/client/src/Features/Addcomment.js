import React from "react";
import { useState, useEffect } from "react";
import Comment from "../Components/Comment";

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
            <div>User not signin</div>
          )}
        </div>
        <div className=" imgcontsp col-md-5 col-lg-5 col-10 blog colcomp2 mx-auto ">
          <h1 className="mx-auto text-center bk" >Comments</h1>
          <div className=" imgcontsp row blog colcomp mx-auto comcomp">
            {Allcomments.length >= 1 ? (
              Allcomments.map((e) => (
                 <Comment
                      username={e.username}
                      comment={e.comment}
                      key={e._id*10}
                      
                 />
       
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
