import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const DeleteBlog = (props) => {
  const history = useHistory();

  useEffect(() => {
    const deleteblog = async () => {
      try {
        const res = await fetch(`/deleteblog/${props.match.params.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ props }),
        });
        const data = await res.json();
        //   console.log(data);
        //   props.posts.filter((ele)=>{ele._id!=data._id})
        history.push("/blogs");
        alert("Deletion done,Refresh the page");
      } catch (e) {
        console.log(e);
      }
    };

    deleteblog();
  }, []);

  return <></>;
};

export default DeleteBlog;
