const express = require("express");
const app = express();
//Creating router where we can perform get/push/update operations
const router = express.Router();
//Getting bcryptjs for hashing password
const bcryptjs = require("bcryptjs");
//Getting jwt from jwt token
const jwt = require("jsonwebtoken");

//For uploading images
const multer = require("multer");
//Defining space for images
const storage = multer.diskStorage({
  //destination for the file
  destination: function (req, file, callback) {
    // callback(null,'./public/uploads/Images')
    callback(null, "../frontend/src/uploads/");
  },

  //add back the entension
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

//upload parameters for multer
const upload = multer({ storage: storage });

app.use(express.json());

//Requiring database and model

require("../db/conn");
const User = require("../models/userschema");
const Blogs = require("../models/userblogs");

//____BASIC CURD OPERATIONS START____

//To get all the blogs
router.get("/getblog", async (req, res) => {
  try {
    const blogdata = await Blogs.find();
    res.status(201).send(blogdata);
  } catch (err) {
    res.status(404).send({ message: "Fail to load blogs!" });
  }
});

//To add a new blog
router.post("/postblog", async (req, res) => {
  try {
    const newblog = new Blogs(req.body);

    const storingblog = await newblog.save();
    res.status(200).send(storingblog);
  } catch (err) {
    res.status(404).send(err);
  }
});

//Get specific blog by id
router.get("/getblog/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const particularblog = await Blogs.findById({ _id });
    res.status(200).send(particularblog);
  } catch (err) {
    res.status(404).send(err);
  }
});

//Get specific blog by id and update it
router.put("/updateblog/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateparticulardata = await Blogs.findByIdAndUpdate(
      { _id },
      req.body,
      { new: true }
    );
    res.status(200).send(updateparticulardata);
  } catch (err) {
    res.status(404).send(err);
  }
});

//Delete the blog
router.delete("/deleteblog/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteparticulardata = await Blogs.findByIdAndDelete({ _id });
    res.status(200).send(deleteparticulardata);
  } catch (err) {
    res.status(404).send(err);
  }
});

//____BASIC CURD OPERATIONS END____

//____ADDITIONAL(UNIMPLEMENTED)____

//Reset Password

//1)Importing Otp model
const Otp = require("../models/otpschema");

//2)Send an email to user
router.post("/emailsend", async (req, res) => {
  try {
    //Destructuring componenets got from req.body
    const { email } = req.body;

    //Checking if any of the field is missing
    if (!email) {
     
      return res.status(400).json({ Error: "Enter the field properly." });
    }

    //Dealing with getting data and saving into database part

    const userexist = await User.findOne({ email: email });
  
    if (userexist) {
      //If user exists generating the otp to be sent to user
      const otpcode = Math.floor(Math.random() * 10000 + 1);
      const otpcreated = new Otp({
        email: email,
        otpcode: otpcode,
        validtill: new Date().getTime() + 300 * 1000,
      });
      const confirmotp = await otpcreated.save();
      const sendotm = otpcreated.mailer();
      return res.status(200).send(confirmotp);
    } else {
      return res.status(422).send({ message: "User is not registered" });
    }
  } catch (e) {
   
    return res.status(400).send({ message: e });
  }
});
router.post("/changepassword", (req, res) => {});
//____ADDITIONAL(UNIMPLEMENTED)____

//____USER REGISTRATION/LOGIN(START)____
router.post("/register", async (req, res) => {
  //Destructuring componenets got from req.body
  const { name, email, phone, work, password, cpassword } = req.body;

  //Checking if any of the field is missing
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ Error: "Enter all the fields" });
  }

  //Dealing with getting data and saving into database part
  try {
    const userexist = await User.findOne({ email: email });

    if (userexist) {
      
      return res.status(422).json({ message: "User exists." });
    } else if (password !== cpassword) {
      return res
        .status(422)
        .json({ message: "Password is not matching with confirm password" });
    } else {
      const newuser = new User(req.body);

      //Some middleware to hash password is running here

      const usercreated = await newuser.save();
      if (usercreated) {
        return res.json({ message: "User is registered now." });
      }
    }
  } catch (e) {
    return res.status(400).send({ message: "Some Error" });
  }
});

//A BETTER Code for user login and authentication only after fetching and checking from database

router.post("/signin", async (req, res) => {
  try {
    //Destructuring componenets got from req.body
    const { email, password } = req.body;

    //Checking if any of the field is missing
    if (!email || !password) {
      return res.status(400).json({ Error: "Enter all the fields properly." });
    }

    //Dealing with getting data and saving into database part

    const userexist = await User.findOne({ email: email });

    if (userexist) {
      //Comapring password with hasged password in database

      const verify = await bcryptjs.compare(password, userexist.password);

      //Generating a token when user logs in
      const token = await userexist.generatetoken();

      if (verify) {
        //Storing generated token in cookies
        res.cookie("jwttoken", token, {
          expires: new Date(Date.now() + 25892000000),
          //  httponly:true
        });

        //Sending necessary user data as response
        const data = {
          _id: userexist._id,
          name: userexist.name,
          email: userexist.email,
        };

        return res.send(data);
      } else {
        return res.status(400).json({ Message: "Inproper cridentials" });
      }
    } else {
      return res.status(401).json({ Message: "invalid Cridentials" });
    }
  } catch (e) {
    
    res.status(400).send(e);
  }
});

//METHOD-2: SIGNING IN
router.post("/login", async (req, res) => {
  try {
    // res.send(ouruser);

    //Destructuring componenets got from req.body
    const { email, password } = req.body;

    //Checking if any of the field is missing
    if (!email || !password) {
      console.log("email/password checked err");
      return res
        .status(400)
        .json({ message: "Enter all the fields properly." });
    }

    //Dealing with getting data and saving into database part

    const userexist = await User.findOne({ email: email });

    if (userexist) {
      //Comapring password with hasged password in database
      const verify = await bcryptjs.compare(password, userexist.password);

      //Generating a token when user logs in
      const token = await userexist.generatetoken();

     
      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 25892000000),
        //  httponly:true
      });

      if (verify) {
        return res.status(200).json({ message: "User logged in" });
      } else {
        return res.status(401).json({ message: "Inproper cridentials" });
      }
    } else {
      return res.status(401).json({ message: "Inproper cridentials" });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//Rendering about page/USER restricted pages if requested

//REquiring the middleware function i.e Authenticate
const Authenticate = require("../Authentication/Authenticate");

//A route to be called when about page is requested
router.get("/about", Authenticate, (req, res) => {
  
  res.send(req.getuser);
});

//A route to be called when data/message from contact is being sent

router.post("/contact", Authenticate, async (req, res) => {
  try {
    //req.body will have all our data
    //Getting this data by destructuring
    const { name, email, phone, message } = req.body;
   

    if (!name || !email || !phone || !message) {
      //   return res.status(402).json({Error:"Al fields not filled"});
      throw new Error("All fields not filled");
    }

    //Authenticate function have variable name req.userId which can use here to find user in database
    const userfound = await User.findOne({ _id: req.Userid });
    console.log(`user is:${userfound}`);
    if (userfound) {
      //Passing this argumentb to async awaut function which bwill store them i9n mesagesw array
      const addmessage = await userfound.addmessage(
        name,
        email,
        phone,
        message
      );

      //Since userdata is updated saving it
      await userfound.save();

      

      res.status(201).json({ message: "User Message Is Sent" });
    }
  } catch (e) {
    console.log(e);
  }
});

//Route for adding comment to a blog
router.post("/addcommentblog", Authenticate, async (req, res) => {
  try {
    //Getting this data by destructuring
    const { blogid, comment, liked } = req.body;
    

    if (!blogid) {
      throw new Error("No blog id");
    }

    //Authenticate function have variable name req.userId which can use here to find user in database
    const userfound = await User.findOne({ _id: req.Userid });
    const findblog = await Blogs.findOne({ _id: blogid });

    if (userfound) {
      //Passing this argumentb to async await function which will store them in user comments array
      const addtolikeblogs = await userfound.addcomment(blogid, comment, liked);
      const userid = req.Userid;
      const username = req.username;

      //Avoiding empty comment
      if (comment !== "") {
        const likeblogsss = await findblog.addtolike(
          username,
          blogid,
          userid,
          comment
        );
      }

      //Since userdata is updated saving it
      await userfound.save();
      await findblog.save();

      res.status(201).json({_id:blogid,comment,userid:req.Userid,username:req.username});
    }
  } catch (e) {
    console.log(e);
  }
});

//To get all the blogs liked by the user
router.get("/getlikedids/:id", Authenticate, async (req, res) => {
  try {
  
    const userdata = await User.findOne({ _id: req.Userid });

    return res.status(200).send(userdata);

    // }
  } catch (e) {
    
    return res.send("Ids could not be accessed");
  }
});

//To increment/decrement like
router.post("/updatelike", Authenticate, async (req, res) => {
  try {
 
    //Getting this data by destructuring
    
    const { blogid, likes, type } = req.body;
   

    if (!blogid) {
      //   return res.status(402).json({Error:"Al fields not filled"});
      throw new Error("No blog id");
    }

    //Authenticate function have variable name req.userId which can use here to find user in database
    const userfound = await User.findOne({ _id: req.Userid });
    const findblog = await Blogs.findOne({ _id: blogid });
   
    if (userfound) {
      const userid = req.Userid;
      const username = req.username;
      
      //Recognising operation  and performing accordingly
      if (type === "increment") {
       
        const userlikedata = await userfound.addtolikedblogs(blogid);
        // console.log(userlikedata);
      } else {
     
        const userlikedata = await userfound.removefromlikedblogs(blogid);
        //console.log(userlikedata);
      }

      const likeblogsss = await findblog.updatelike(likes);


      

      //Since userdata is updated saving it
      await userfound.save();
      await findblog.save();

      return res.status(201).send(likeblogsss);
    }
  } catch (e) {
    console.log(e);
  }
});


//LOGOUT function
router.get("/logout", async (req, res) => {
  //Deleteb cookie and redirect user to home page
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).send("User logout");
});
module.exports = router;
