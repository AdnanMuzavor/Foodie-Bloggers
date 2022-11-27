import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Userdisplay from "./Userwritedisplay";
const Yourwrite = () => {
  //To store user data/details
  const [userdata, setuserdata] = useState({});
  const [usercontent, setusercontent] = useState([]);
  //Defining history variable to use
  const history = useHistory();

  //Defining function to fetch user data
  const Callwritepage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        cridentials: "include",
      });
      const data = await res.json();

      if (!res.status === 200) {
        throw new Error("User not found");
      }

      setusercontent(data.blogs);

      setuserdata(data);
    } catch (e) {
      console.log(e);
      // history.push("/login")
    }
  };

  //To call a function to fetch datab from user database
  useEffect(() => {
    Callwritepage();
  }, []);
  return (
    <>
      <section className="center_imp">
        <h2 className="text-center text">Hey, here is your content.</h2>
        <hr className="mx-auto w-25"></hr>

        {/* <h2>{userdata.name}</h2> */}
        <div className="container nobg">
          <div className="row d-flex justify-content-center">
            {usercontent.map((ele, ind) => {
              return (
                <Userdisplay
                  name={ele.name}
                  title={ele.title}
                  food={ele.food}
                  content={ele.content}
                  ind={ind + 1}
                  key={ele._id}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Yourwrite;
