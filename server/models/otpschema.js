const mongoose = require("mongoose");

//Helps in sending mail to the user
const nodemailer= require("nodemailer");

const otpschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otpcode: {
    type: String,
    required: true,
  },
  validtill: {
    type: Number,
    required: true,
  },
});

otpschema.methods.mailer=function(){
    const transporter=nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }
    })

    const mailOptions={
        from:process.env.EMAIL,
        to: this.email,
        subject: 'Sending code to reset your password',
        text: 'Thank You!'
    }

    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("Email Sent: "+ info.response);
        }
    })

}
const Otp = new mongoose.model("Otp", otpschema);
module.exports = Otp;
