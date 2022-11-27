import "./App.css";
import React from "react";
import Home from "./Screens/Home";
import Contact from "./Screens/Contact";
import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import Navbar from "./Components/Navbar";
import About from "./Screens/About";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Error from "./Screens/Error";
import Logout from "./Screens/Logout";
import ResetPassword from "./Screens/ResetPassword";
import { useReducer } from "react";
import { createContext } from "react";
import { initialstate } from "./reducers/reducerfn";
import { reducer } from "./reducers/reducerfn";
import Footer from "./Components/Footer";
import Onlyblog from "./Screens/Displayonlyblog";

import Editblog from "./Screens/Editonlyblog";
import DeleteBlog from "./Screens/Deleteonlyblog";
//Blog rendering part
import Allblogs from "./Screens/AllBlogs";
import 'react-notifications/lib/notifications.css';
import { useState } from "react";
import { useEffect } from "react";
import Writeblog from "./Screens/writeblog";
export const usercontext = createContext();

function App() {
  const [posts, setposts] = useState([]);

  const getallblogs = async () => {
    try {
      const res = await fetch("/getblog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(`post data:${data}`);
      setposts(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getallblogs();
  }, []);

  const [state, dispatch] = useReducer(reducer, initialstate);

  const Routing = () => {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about" posts={posts}>
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/resetpassword">
          <ResetPassword />
        </Route>
        {/* <Route path="/login?" render={(props)=> <Login {...props} />}/> */}

        <Route path="/logout">
          <Logout />
        </Route>

        <Route path="/blogs" render={() => <Allblogs posts={posts} />} />

        <Route
          path="/getblog/:id"
          render={(props) => <Onlyblog {...props} posts={posts} />}
        />
        <Route
          path="/writeblogs"
          render={(props) => <Writeblog {...props} posts={posts} />}
        />
        <Route
          path="/updateblog/:id"
          render={(props) => <Editblog {...props} posts={posts} />}
        />
        <Route
          path="/deleteblog/:id"
          render={(props) => <DeleteBlog {...props} posts={posts} />}
        />
        <Route>
          <Error />
        </Route>
      </Switch>
    );
  };

  return (
    <>
      <usercontext.Provider value={{ state, dispatch }}>
        {/* <Navimg/> */}
        <Navbar />

        <Routing />
        <Footer />
      </usercontext.Provider>
    </>
  );
}

export default App;
