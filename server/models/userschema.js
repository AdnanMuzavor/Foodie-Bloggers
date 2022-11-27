const mongoose= require("mongoose");


const userschema=new mongoose.Schema({
    name:{
type:String,
required:true,
    },
    email:{
type:String,
required:true,
    },
    phone:{
type:Number,
required:true,        
    },
    work:{
type:String,
required:true,
    },
    password:{
type:String,
required:true,        
    },
    cpassword:{
type:String,
required:true,        
    },
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ],
    messages:[
        {
            name:{
                type:String,
                 required:true,

            },
            email:{
                type:String,
                 required:true,

            },
            phone:{
                type:String,
                 required:true,

            },
            message:{
                type:String,
                 required:true,

            },
           
        }
    ],
    commentaddedblogs:[
        {
          blogid:{
              type:String,
              required:true,
          },
          comment:{
              type:String,
          },
          liked:{
              type:Boolean,
          }
        },
    ],
    likedbyuser:[
        {
            blogid:{
                type:String,
            }
        }
    ]
    
});


//Middleware to hash the PASSWORD
//Runs in between register router before saving any registered user

const bcryptjs=require("bcryptjs");

userschema.pre('save',async function(next){
    try {
        if(this.isModified("password")){
            this.password=await bcryptjs.hash(this.password,12);
            this.cpassword=await bcryptjs.hash(this.cpassword,12);
        }
        next();
    } catch (e) {
        console.log(e);
    }
})

//Generating token called through signin function
const jwt=require("jsonwebtoken");
userschema.methods.generatetoken=async function(){
    try {
        const token= await jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
        
    } catch (e) {
        console.log(e);
    }
}

//Adding message sent by user
userschema.methods.addmessage=async function(name,email,phone,message){
    try {
  this.messages=this.messages.concat({name,email,phone,message});
  await this.save();
  return this.messages;
        
    } catch (e) {
        console.log(e);
    }
}

//Keeping records of all the blogs where user had commented
userschema.methods.addcomment=async function(blogid,comment,liked){
    try {
  this.commentaddedblogs=this.commentaddedblogs.concat({blogid,comment,liked});
  await this.save();
  return this.commentaddedblogs;
        
    } catch (e) {
        console.log(e);
    }
}

//add to like blogs/to know blogs liked by user
userschema.methods.addtolikedblogs=async function(blogid){
    try {
  this.likedbyuser=this.likedbyuser.concat({blogid});
  await this.save();
  return this.likedbyuser;
        
    } catch (e) {
        console.log(e);
    }
}

//To remove blog from liked list
userschema.methods.removefromlikedblogs=async function(blogid){
    try {
  this.likedbyuser=this.likedbyuser.filter((e)=>{return e.blogid!==blogid});
  await this.save();
  return this.likedbyuser;
        
    } catch (e) {
        console.log(e);
    }
}

const User= new mongoose.model("User",userschema);

module.exports=User;