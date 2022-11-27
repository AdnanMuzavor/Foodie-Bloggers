const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { compareSync } = require("bcryptjs");

const UserBlogs = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  food: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  imglink: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  commentedblogs: [
    {
      comment: {
        type: String,
      },
      userid: {
        type: String,
      },
      username: {
        type: String,
      },
    },
  ],
  likes: {
    type: Number,
  },
});

//To handle comments on the blogs/Add new comments
UserBlogs.methods.addtolike = async function (
  username,
  blogid,
  userid,
  comment
) {
  console.log("in this function");
  console.log(this.commentedblogs);
  try {
    this.commentedblogs = this.commentedblogs.filter((e) => {
      return e._id !== blogid;
    });
    this.commentedblogs = this.commentedblogs.concat({
      comment,
      userid,
      username,
    });
    console.log(this.commentedblogs);
    //  await this.save();
    return this.likedata;
  } catch (e) {
    console.log(e);
  }
};

//To update like as per specified type
UserBlogs.methods.updatelike = async function (likess) {
  console.log("in this function");
  console.log(this.commentedblogs);
  try {
    console.log(`adding ${likess}`);
    if (likess < 0) {
      this.likes = 0;
    } else {
      this.likes = likess;
    }
    console.log(this.commentedblogs);
    //  await this.save();
    return this.likes;
  } catch (e) {
    console.log(e);
  }
};

const Blogs = new mongoose.model("Blog", UserBlogs);
module.exports = Blogs;
